# SPÖ Vorsitzbefragungs-Kabine 2023

## Technologien
- Next.js 13
- Typescript
- Zustand
- Zod
- Tailwind
- Framer Motion

## Todos
- Allgemein 
    - [x] Kategorie pro Frage anzeigen
    - [x] UI für alle anzeigen und per 1 click zu einer Frage springen
    - [x] Frage skippen erlauben?
- Wähler:innen Flow
    - [x] Falls localstorage data hat: Sharen & Neustarten auf Endseite anzeigen 
    - Resultat Seite
        - [x] Kandidat:innen geranked anzeigen
        - [x] Vergleich zwischen eigenen Ergebnis und Kandidat:in anzeigen
        - [x] Kandidat:innen untereinander vergleichen
- Portability
    - [ ] Korrekte Meta Tags auf jeder Seite
        - [ ] Index
        - [ ] Kandidat:in
        - [ ] Fragebogen
        - [ ] Wähler:in Ergebnis
        - [ ] Wähler:in Vergleich mit Kandidat:in
        - [ ] Kandidat:in Vergleich mit Kandidat:in
    - [ ] OG Bilder für alle Seiten
        - [ ] Index
        - [ ] Kandidat:in
        - [ ] Fragebogen
        - [ ] Wähler:in Ergebnis
        - [ ] Wähler:in Vergleich mit Kandidat:in
        - [ ] Kandidat:in Vergleich mit Kandidat:in
    - [ ] Link kopieren und teilen auf jeder Seite
- Design
    - [x] JG CI übernehmen
        - [x] Fonts
        - [x] Farben
        - [x] Logo
        - [x] Grafiken
- Kandidat:innen Flow
    - [x] Vordefinierten Link pro Kandidat:in definieren
    - [x] Kandidat:innen haben ein Textfeld für extra Informationen
    - [x] Fragen bearbeitbar machen ?
- Fragebogen
    - [x] Echte Fragen hinzufügen
    - Barrierefreiheit
        - [ ] `prefers-reduced-motion` beachten
        - [ ] App mit Tastatur testen
        - [ ] App mit VoiceOver testen
        - [ ] App mit Screenreader testen
- Informationsseiten hinzufügen
    - [ ] Datenschutz
    - [x] Impressum
- Performance
    - [ ] Cache static data endpoints to prep for possible scale
        - [ ] Questions
    - [ ] Use SSG or ISR wherever possible
- Code
    - [x] Refactor questionnaireStore
        - [x] Deal with duplicated code for setting option, weighting and text OR use immer
