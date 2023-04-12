# SPÖ Vorstandswahl-Kabine 2023

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
    - [ ] Falls localstorage data hat: Sharen & Neustarten auf Endseite anzeigen 
    - Resultat Seite
        - [ ] Kandidat:innen geranked anzeigen
        - [ ] Vergleich zwischen eigenen Ergebnis und Kandidat:in anzeigen
        - [ ] Kandidat:innen untereinander vergleichen
- Portability
    - [ ] Korrekte Meta Tags auf jeder Seite
    - [ ] OG Bilder für alle Seiten
    - [ ] Link kopieren und teilen auf jeder Seite
- Design
    - [ ] JG CI übernehmen
        - [ ] Fonts
        - [ ] Farben
        - [ ] Logo
        - [ ] Grafikençt
- Kandidat:innen Flow
    - [x] Vordefinierten Link pro Kandidat:in definieren
    - [x] Kandidat:innen haben ein Textfeld für extra Informationen
    - [x] Fragen bearbeitbar machen?
- Fragebogen
    - [x] Echte Fragen hinzufügen
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
        - [x] Deal with duplicated code for setting option, weighting and text OR use immer
