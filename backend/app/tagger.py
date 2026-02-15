from keybert import KeyBERT
import spacy

kw_model = KeyBERT()
nlp = spacy.load("en_core_web_sm")


def lemma_key(phrase: str) -> str:
    doc = nlp(phrase)
    return " ".join(
        token.lemma_.lower()
        for token in doc
        if token.is_alpha
    )


def extract_tags(text: str, max_tags: int = 6) -> list[str]:
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 1),
        stop_words="english",
        top_n=max_tags * 3,   # overfetch for grouping
    )

    # group by lemma root
    best_by_lemma = {}

    for item in keywords:
        if not isinstance(item,tuple):
            continue
        phrase, score = item
        key = lemma_key(phrase)

        if not key:
            continue

        if key not in best_by_lemma:
            best_by_lemma[key] = (phrase, score)
        else:
            # keep better scored variant
            if score > best_by_lemma[key][1]:
                best_by_lemma[key] = (phrase, score)

    # sort winners by score
    winners = sorted(
        best_by_lemma.values(),
        key=lambda x: x[1],
        reverse=True
    )

    return [phrase.lower() for phrase, _ in winners[:max_tags]]
