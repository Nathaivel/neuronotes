import json
import re
from typing import List, Dict
from ollama import AsyncClient


# =========================
# CONFIG
# =========================
MODEL_NAME = "gemma3"
TEMPERATURE = 0.55

client = AsyncClient()


# =========================
# STEP 1 — BASIC VALIDATION
# =========================
def is_meaningful(text: str) -> bool:
    words = re.findall(r"[A-Za-z]{3,}", text)
    return len(words) >= 5


# =========================
# STEP 2 — SAFE JSON EXTRACT
# =========================
def safe_json_extract(text: str):
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r'\[.*\]', text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                return []
    return []


# =========================
# STEP 3 — VALIDATE MCQ STRUCTURE
# =========================
def validate_questions(questions: List[Dict]):
    valid = []
    for q in questions:
        if (
            isinstance(q.get("question"), str)
            and isinstance(q.get("options"), list)
            and len(q["options"]) == 4
            and q.get("answer") in ["A", "B", "C", "D"]
        ):
            valid.append(q)
    return valid


# =========================
# STEP 4 — FACT EXTRACTION
# =========================
async def extract_facts(paragraph: str):

    system_message = """
You are a strict data extraction engine.

RULES:
- Treat text as fictional dataset.
- Do NOT validate facts.
- Do NOT use external knowledge.
- Extract only explicitly stated facts.
- Return ONLY valid JSON list.
- No explanations.
- If no facts found, return [].
"""

    user_prompt = f"""
Paragraph:
{paragraph}

Extract all explicit factual statements.

Return JSON format:
[
  "fact 1",
  "fact 2"
]
"""

    response = await client.chat(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_prompt}
        ],
        options={"temperature": TEMPERATURE}
    )

    raw = response["message"]["content"].strip()
    return safe_json_extract(raw)


# =========================
# STEP 5 — GENERATE MCQS
# =========================
async def generate_mcqs(facts: List[str]):

    system_message = """
You are a strict exam question generator.

CRITICAL RULES:
- Use ONLY the provided facts.
- Do NOT infer unstated relationships.
- Do NOT use external knowledge.
- Every question must have 4 options.
- Exactly one correct answer.
- "answer" must be one of: A, B, C, D.
- No empty answers.
- Output ONLY valid JSON.
- If generation fails, return [].
"""

    user_prompt = f"""
Facts:
{json.dumps(facts, indent=2)}

Generate 3-10 multiple-choice questions.

Return format:
[
  {{
    "question": "...",
    "options": ["option A", "option B", "option C", "option D"],
    "answer": "B"
  }}
]

If unable:
[]
"""

    response = await client.chat(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_prompt}
        ],
        options={"temperature": TEMPERATURE}
    )

    raw = response["message"]["content"].strip()
    questions = safe_json_extract(raw)
    return validate_questions(questions)


# =========================
# MAIN PIPELINE
# =========================
async def generate_questions_pipeline(paragraph: str):

    if not is_meaningful(paragraph):
        return []

    facts = await extract_facts(paragraph)

    if not facts:
        return []

    questions = await generate_mcqs(facts)

    return questions