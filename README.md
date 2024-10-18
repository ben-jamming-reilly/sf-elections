# SF Elections

It can be tough to understand what people actually advocate for.

So here is a website that list elections and candidate

Forked from andererseits-wahlkabine

## Scripts

- `npm run import-glossary` Imports the glossar from the CSV file in `src/scripts/data/wahlkabine-glossar.csv
- `npm run import-election "Election Name" "election-slug"` Imports the election data from the CSV file in `src/scripts/data/wahlkabine-parties.csv` and creates the election, candidates and questions.

## Stack

- Next.js 14
- Typescript
- Zustand
- Zod
- Tailwind
- Framer Motion
