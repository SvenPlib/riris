# Uporaba Node.js in Express za Zaledni del

## Context and Problem Statement

Za aplikacijo ServisDesk je treba izbrati tehnologijo za razvoj zalednega dela aplikacije, ki bo skrbel za obdelavo zahtevkov iz čelnega dela, izvajanje poslovne logike, komunikacijo s podatkovno bazo ter avtentikacijo uporabnikov.

Zaledni del mora omogočati implementacijo REST API-ja, preko katerega bo čelni del dostopal do podatkov o uporabnikih, servisnih zahtevkih in njihovi zgodovini.

## Considered Options

- Node.js z Express
- Python z ogrodjem Flask
- Java s Spring Boot

## Decision Outcome

Chosen option: "Node.js z Express", because Node.js omogoča uporabo JavaScripta tudi na strežniški strani, s čimer se lahko enak programski jezik uporablja na čelnem in zalednem delu aplikacije.

Express omogoča preprosto definiranje REST API endpointov, uporabo middleware funkcij ter modularno organizacijo strežniške aplikacije. Zaradi velikega ekosistema npm je mogoče enostavno vključiti tudi knjižnice za povezavo s PostgreSQL, JWT avtentikacijo, nalaganje datotek in pošiljanje e-pošte.

### Consequences

- Good, because se JavaScript uporablja tako na čelnem kot na zalednem delu, kar poenostavi razvoj in zmanjša potrebo po uporabi več programskih jezikov.
- Good, because Express omogoča enostavno izdelavo in organizacijo REST API endpointov.
- Good, because middleware pristop omogoča ločeno obravnavo avtentikacije, preverjanja zahtevkov, napak in drugih skupnih funkcionalnosti.
- Good, because npm ekosistem omogoča uporabo velikega števila obstoječih knjižnic za funkcionalnosti, ki jih potrebuje ServisDesk.
- Good, because asinhroni način delovanja Node.js ustreza spletni aplikaciji, kjer backend pogosto čaka na operacije s podatkovno bazo, datotekami ali zunanjimi storitvami.
- Bad, because je projekt odvisen od več npm paketov, ki jih je treba redno vzdrževati in posodabljati.
- Bad, because lahko nepravilno obravnavanje asinhrone kode povzroči težje sledljive napake.
