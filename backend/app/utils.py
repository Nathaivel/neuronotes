from datetime import *
import re
import html

def is_same_week(date1, date2):
    return date1.year == date2.year and date1.isocalendar()[1] == date2.isocalendar()[1]

def is_same_month(date1, date2):
    return date1.month == date2.month and date1.year == date2.year

def clean_html_content(raw: str) -> str:
    """
    Convert escaped HTML into clean plain text.
    """

    #Unescape \u003C → <
    unescaped = html.unescape(raw)

    #HTML tags
    no_tags = re.sub(r"<[^>]+>", " ", unescaped)

    #whitespace
    cleaned = re.sub(r"\s+", " ", no_tags).strip()

    return cleaned