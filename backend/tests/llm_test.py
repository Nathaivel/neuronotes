import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import tagger, summarizer, mcq_question_generator
import asyncio
import argparse

parser = argparse.ArgumentParser(description="Test the capabilities of the llms used")

parser.add_argument("input", help="Get the input to be processed")
parser.add_argument("--tags", action="store_true", help="Test the tagging feature use --tags <input>")
parser.add_argument("--summary", action="store_true", help="Test the summarizing feature use --summary <input>")
parser.add_argument("--mcq", action="store_true", help="Test the mcq generating feature use --mcq <input>")

args = parser.parse_args()
if args.tags:
    tagger.test(args.input)
elif args.mcq:
    asyncio.run(mcq_question_generator.test(args.input))
elif args.summary:
    print(summarizer.generate_summary(args.input))
else:
    print("nothing to print...")
