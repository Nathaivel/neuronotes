from datetime import *


def is_same_week(date1, date2):
    return date1.year == date2.year and date1.isocalendar()[1] == date2.isocalendar()[1]

def is_same_month(date1, date2):
    return date1.month == date2.month and date1.year == date2.year