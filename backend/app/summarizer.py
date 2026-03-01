import ollama
import re
import json
import time
from typing import Dict, Optional

# =========================================================
# CONFIG
# =========================================================

MODEL_NAME = "gemma3"
TEMPERATURE = 0.2
MAX_RETRIES = 2


# =========================================================
# UTILS
# =========================================================

def count_words(text: str) -> int:
    return len(re.findall(r"\w+", text))


def compute_summary_target(note: str) -> int:
    words = count_words(note)

    if words < 50:
        return max(15, int(words * 0.5))
    elif words < 200:
        return int(words * 0.35)
    elif words < 800:
        return int(words * 0.25)
    else:
        return int(words * 0.15)


def extract_json(text: str) -> Optional[str]:
    match = re.search(r"\{.*\}", text, re.DOTALL)
    return match.group() if match else None


# =========================================================
# LLM CLIENT
# =========================================================

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


# =========================================================
# VALIDATOR
# =========================================================

class NoteValidator:

    def __init__(self, llm: LLMClient):
        self.llm = llm

    def heuristic_checks(self, note: str) -> Dict:
        return {
            "too_short": len(note.strip()) < 20,
            "mostly_symbols": len(re.findall(r"[a-zA-Z]", note)) < 10,
            "repeated_chars": bool(re.search(r"(.)\1{5,}", note))
        }

    def validate(self, note: str) -> Dict:

        heuristics = self.heuristic_checks(note)

        if any(heuristics.values()):
            return {
                "valid": False,
                "reason": "Failed heuristic checks",
                "details": heuristics
            }

        system_prompt = """
You are a strict content validator.
Determine if the text is a meaningful academic/work note.

Respond ONLY in JSON:
{
  "valid": true/false,
  "reason": "short explanation"
}
"""

        for _ in range(MAX_RETRIES):
            response = self.llm.chat(system_prompt, note)
            json_text = extract_json(response)

            if json_text:
                try:
                    return json.loads(json_text)
                except:
                    continue

        return {
            "valid": False,
            "reason": "Validator parsing failed"
        }


# =========================================================
# SUMMARIZER
# =========================================================

class Summarizer:

    def __init__(self, llm: LLMClient):
        self.llm = llm

    def summarize(self, note: str) -> str:
        target_words = compute_summary_target(note)

        system_prompt = f"""
You are a summarization engine.

Rules:
- Do NOT include meta commentary.
- Do NOT say "Here is a summary".
- Start directly with content.
- Target about {target_words} words.
- No hallucinations.
- Preserve key meaning.
"""

        return self.llm.chat(system_prompt, note)


# =========================================================
# REVIEWER
# =========================================================

class SummaryReviewer:

    def __init__(self, llm: LLMClient):
        self.llm = llm

    def review(self, note: str, summary: str) -> Dict:

        system_prompt = """
You are a strict reviewer.

Respond ONLY in JSON:
{
  "accurate": true/false,
  "hallucination": true/false,
  "missing_key_info": true/false,
  "quality_score": 1-10
}
"""

        combined = f"""
NOTE:
{note}

SUMMARY:
{summary}
"""

        for _ in range(MAX_RETRIES):
            response = self.llm.chat(system_prompt, combined)
            json_text = extract_json(response)

            if json_text:
                try:
                    return json.loads(json_text)
                except:
                    continue

        return {
            "accurate": False,
            "hallucination": True,
            "missing_key_info": True,
            "quality_score": 0
        }


# =========================================================
# MAIN PIPELINE (JSON OUTPUT)
# =========================================================

class SummarizationPipeline:

    def __init__(self):
        self.llm = LLMClient()
        self.validator = NoteValidator(self.llm)
        self.summarizer = Summarizer(self.llm)
        self.reviewer = SummaryReviewer(self.llm)

    def run(self, note: str) -> Dict:

        validation = self.validator.validate(note)

        if not validation.get("valid"):
            return {
                "success": False,
                "error": "Invalid note",
                "validation": validation
            }

        start = time.time()
        summary = self.summarizer.summarize(note)
        latency = round(time.time() - start, 3)

        review = self.reviewer.review(note, summary)

        original_wc = count_words(note)
        summary_wc = count_words(summary)

        return {
            "success": True,
            "validation": validation,
            "metrics": {
                "original_word_count": original_wc,
                "summary_word_count": summary_wc,
                "compression_ratio": round(summary_wc / original_wc, 3),
                "latency_seconds": latency
            },
            "summary": summary,
            "review": review
        }


def generate_summary(text: str):
    pipeline = SummarizationPipeline()
    result = pipeline.run(text)

    return result