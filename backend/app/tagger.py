import ollama
import re
import json
import time
from typing import Dict, List, Optional
from app.utils import clean_html_content
import asyncio

MODEL_NAME = "gemma3"
TEMPERATURE = 0.2
MAX_RETRIES = 2

def extract_json_array(text: str) -> Optional[List[str]]:
    match = re.search(r"\[.*\]", text, re.DOTALL)
    if not match:
        return None
    try:
        data = json.loads(match.group())
        if isinstance(data, list):
            return data
    except:
        return None
    return None


def count_words(text: str) -> int:
    return len(re.findall(r"\w+", text))



class LLMClient:

    def __init__(self, model: str = MODEL_NAME, temperature: float = TEMPERATURE):
        self.model = model
        self.temperature = temperature

    def chat(self, system_prompt: str, user_prompt: str) -> str:
        response = ollama.chat(
            model=self.model,
            options={"temperature": self.temperature},
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        return response["message"]["content"].strip()


class TagGenerator:

    def __init__(self, llm: LLMClient):
        self.llm = llm

    def generate(self, text: str, max_tags: int) -> List[str]:

        system_prompt = f"""
You are a keyword extraction engine.

Rules:
- Extract single-word tags only.
- Lowercase.
- No explanations.
- No duplicates.
- Return STRICT JSON array.
- Maximum {max_tags * 3} tags.
"""

        for _ in range(MAX_RETRIES):
            try:
                response = self.llm.chat(system_prompt, text)
                tags = extract_json_array(response)
                if tags:
                    return tags
            except:
                continue

        return []

class TagRefiner:

    def __init__(self, llm: LLMClient):
        self.llm = llm

    def refine(self, tags: List[str]) -> List[str]:

        if not tags:
            return []

        system_prompt = """
You are a strict tag refinement agent.

Remove:
- Generic words
- Weak terms
- Stopwords
- Very broad concepts

Keep strong meaningful academic/work tags.

Return STRICT JSON array.
"""

        for _ in range(MAX_RETRIES):
            try:
                response = self.llm.chat(system_prompt, json.dumps(tags))
                refined = extract_json_array(response)
                if refined:
                    return refined
            except:
                continue

        return []



class TagReviewer:

    def __init__(self, llm: LLMClient):
        self.llm = llm

    def review(self, text: str, tags: List[str]) -> Dict:

        if not tags:
            return {
                "accurate": False,
                "quality_score": 0
            }

        system_prompt = """
You are a strict tag quality reviewer.

Respond ONLY in JSON:
{
  "accurate": true/false,
  "relevant": true/false,
  "quality_score": 1-10
}
"""

        combined = f"""
TEXT:
{text}

TAGS:
{json.dumps(tags)}
"""

        for _ in range(MAX_RETRIES):
            try:
                response = self.llm.chat(system_prompt, combined)
                json_match = re.search(r"\{.*\}", response, re.DOTALL)
                if json_match:
                    return json.loads(json_match.group())
            except:
                continue

        return {
            "accurate": False,
            "relevant": False,
            "quality_score": 0
        }


class TagExtractionPipeline:

    def __init__(self):
        self.llm = LLMClient()
        self.generator = TagGenerator(self.llm)
        self.refiner = TagRefiner(self.llm)
        self.reviewer = TagReviewer(self.llm)

    def run(self, text: str, max_tags: int = 6) -> Dict:
        text = clean_html_content(text)
        if not text.strip():
            return {
                "success": False,
                "error": "Empty input",
                "tags": []
            }

        try:
            start = time.time()

            candidates = self.generator.generate(text, max_tags)
            refined = self.refiner.refine(candidates)
            final_tags = refined[:max_tags]

            review = self.reviewer.review(text, final_tags)

            latency = round(time.time() - start, 3)

            return {
                "success": True,
                "metrics": {
                    "input_word_count": count_words(text),
                    "candidate_count": len(candidates),
                    "final_tag_count": len(final_tags),
                    "latency_seconds": latency
                },
                "tags": [t.lower() for t in final_tags],
                "review": review
            }

        except Exception:
            return {
                "success": False,
                "error": "Ollama server unavailable",
                "tags": []
            }


def generate_tags(text: str, max_tags: int = 6):
    pipeline = TagExtractionPipeline()
    result = pipeline.run(text, max_tags=max_tags)

    if not result.get("success"):
        return []

    return result["tags"]

def test(paragraph: str):
    tags = json.dumps(generate_tags(paragraph), indent=5)
    print("\n Output:")
    print(tags)
