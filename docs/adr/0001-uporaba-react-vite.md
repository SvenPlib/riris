# Uporaba React in Vite za čelni del

## Context and Problem Statement

Za razvoj uporabniškega vmesnika aplikacije ServisDesk je potrebno izbrati tehnologijo za čelni del. Aplikacija bo vsebovala več pogledov, obrazcev in prikazov podatkov glede na različne uporabniške vloge.

## Considered Options

- React z Vite
- Vue
- JavaScript brez frontend ogrodja

## Decision Outcome

Chosen option: "React z Vite", because React omogoča komponentno zasnovo uporabniškega vmesnika, ponovno uporabo komponent ter učinkovito upravljanje dinamičnih podatkov in stanja aplikacije. To je primerno za ServisDesk, kjer se bodo prikazovali različni obrazci, seznami zahtevkov in pogledi glede na uporabniško vlogo.

Vite omogoča hiter razvojni strežnik, hitro osveževanje sprememb med razvojem (Hot Module Replacement) ter pripravo optimizirane produkcijske različice aplikacije.

### Consequences

- Good, because komponentni pristop v Reactu omogoča ponovno uporabo elementov uporabniškega vmesnika in zmanjšuje podvajanje kode.
- Good, because React omogoča enostavno izdelavo dinamičnih pogledov, ki se spreminjajo glede na stanje aplikacije in uporabniško vlogo.
- Good, because Vite omogoča hiter razvojni strežnik in Hot Module Replacement, kar pospeši razvoj in testiranje uporabniškega vmesnika.
- Good, because izbrani pristop omogoča enostavno vzdrževanje zaradi jasne razdelitve uporabniškega vmesnika na komponente.
- Bad, because je za razvoj potrebno poznavanje Reactovega načina dela, vključno s komponentami, stanjem in življenjskim ciklom komponent.
- Bad, because aplikacija postane odvisna od React in Vite ekosistema ter njunih paketov.
- Bad, because lahko pri večjem številu komponent in stanj upravljanje uporabniškega vmesnika postane kompleksnejše.
