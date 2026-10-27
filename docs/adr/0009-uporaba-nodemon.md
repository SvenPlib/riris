# Uporaba Nodemon za razvoj zalednega dela

## Context and Problem Statement

Zaledni del aplikacije ServisDesk se razvija z uporabo Node.js in Express ter se izvaja znotraj Docker vsebnika. Izvorna koda zalednega dela je z Docker bind mountom povezana z lokalno razvojno mapo, zato se spremembe kode takoj prenesejo v vsebnik.

Pri razvoju je potrebno zagotoviti, da se Node.js strežnik ob spremembah izvorne kode samodejno ponovno zažene. Brez tega bi bilo potrebno po vsaki spremembi kode ročno ponovno zagnati zaledni del oziroma Docker vsebnik, kar bi upočasnilo razvoj in testiranje.

## Considered Options

- Node.js `--watch`
- Nodemon
- ročni ponovni zagon Node.js strežnika oziroma Docker vsebnika

## Decision Outcome

Chosen option: "Nodemon", because omogoča samodejno spremljanje sprememb v izvorni kodi in ponovni zagon Node.js strežnika med razvojem. V kombinaciji z Docker bind mountom se spremembe lokalne izvorne kode prenesejo v vsebnik, Nodemon pa jih zazna in ponovno zažene zaledni del aplikacije.

### Consequences

- Good, because se Node.js strežnik ob spremembi izvorne kode samodejno ponovno zažene.
- Good, because ni potrebno ročno ponovno zaganjati Docker vsebnika po vsaki spremembi backend kode.
- Good, because omogoča hitrejši razvoj in testiranje REST API endpointov.
- Good, because dobro deluje skupaj z Docker bind mountom, preko katerega se lokalne spremembe kode prenesejo v vsebnik.
- Bad, because projekt pridobi dodatno razvojno odvisnost.
- Bad, because spremljanje sprememb lahko povzroči nekoliko večjo porabo sistemskih virov.
