# Data — sources & method

## Sources (all public domain)

| Book | Author | Year | Role |
|---|---|---|---|
| Pocket Manual of Homoeopathic Materia Medica | William Boericke | 1927 | relationships + keynotes |
| Dictionary of Practical Materia Medica | John Henry Clarke | 1900 | relationships + clinical indications |
| Guiding Symptoms of Our Materia Medica | Constantine Hering | 1879 | relationships |

Scans were obtained from the Internet Archive.

## Method

1. **Extract** each book's “Relations” sections (and, where present, the opening description /
   clinical indications).
2. **Normalise** OCR: collapse whitespace, repair hyphenated line-breaks, fix common OCR
   confusions (J→I, spaced abbreviations like `Nat. m.` → `Nat-m`).
3. **Resolve** each remedy token against a vocabulary of abbreviations, synonyms and full names.
4. **Canonicalise** names: unify short/full forms (Pulsatilla → Pulsatilla nigricans), merge
   OCR variants, map bare genera to their primary species.
5. **Merge** the three sources, recording a per-edge `sources` list.
6. **Attach** keynotes (Boericke description, or Clarke clinical indications where Boericke has none).

## Provenance

Every relationship carries the list of books that assert it. In the UI the superscript on each
remedy chip shows **B**, **C**, **H** or a combination. The “corroborated only” filter keeps just
the relationships asserted by two or more books.

## Caveats

- The source scans are OCR; a small number of relationships or spellings may be imperfect.
- Boericke's prose “Compare” lists and Clarke's narrative relations are the noisiest; the
  corroboration filter is the best defence against them.
- This dataset is for **study and reference**. It is not medical advice. Verify clinically
  against the printed originals.
