# SPÖ Vorstandswahl-Kabine 2023

## Technologien
- Next.js 13
- Typescript
- Zustand
- Tailwind
- Framer Motion

## Todos
- Resultate Seite anzeigen am Ende
    - [ ] Kandidat:innen geranked anzeigen
    - [ ] Vergleich zwischen eigenen Ergebnis und Kandidat:innen anzeigen
    - [ ] Kandidat:innen auswählbar machen und dann untereinander vergleichen
- Fragebogen Kandidat:innen Modus
    - [x] Vordefinierten Link pro Kandidat:in definieren
    - [x] Kandidat:innen haben ein Textfeld für extra Informationen
    - [ ] Fragen bearbeitbar machen?
- Fragebogen
    - [ ] Echte Fragen hinzufügen
    - Barrierefreiheit
        - [ ] `prefers-reduced-motion` beachten
        - [ ] App mit Tastatur testen
        - [ ] App mit VoiceOver testen
        - [ ] App mit Screenreader testen
- Informationsseiten hinzufügen
    - [ ] Über die Wahlkabine
    - [ ] Datenschutz
    - [ ] Impressum
- Code
    - [ ] Refactor questionnaireStore
        - [ ] Deal with duplicated code for setting option, weighting and text OR use immer
        - [ ] Create `voterQuestionaireStore` & `candidateQuestionnaireStore` + clean up `<Questionnaire />` to make it a "dumb" component
