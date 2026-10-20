# Email obveščanje z Nodemailer

## Context and Problem Statement

Aplikacija ServisDesk mora uporabnike obveščati o spremembah statusa njihovih servisnih zahtevkov. Potrebno je določiti način, kako bo zaledni del aplikacije pošiljal email obvestila.

Pošiljanje obvestil mora biti izvedeno na zalednem delu, saj se spremembe statusov izvajajo preko backend poslovne logike.

## Considered Options

- Nodemailer preko SMTP
- zunanja email storitev preko lastnega API-ja

## Decision Outcome

Chosen option: "Nodemailer preko SMTP", because Nodemailer omogoča neposredno pošiljanje email sporočil iz Node.js aplikacije in se enostavno vključi v obstoječi zaledni del aplikacije.

Uporaba SMTP omogoča povezavo z različnimi ponudniki email storitev, pri čemer logika pošiljanja obvestil ostane v zalednem delu aplikacije.

## Consequences

- Good, because se pošiljanje email obvestil izvaja neposredno iz obstoječega Node.js zalednega dela.
- Good, because lahko sistem samodejno pošlje obvestilo ob spremembi statusa servisnega zahtevka.
- Good, because Nodemailer podpira standardni SMTP in zato ni neposredno vezan na enega ponudnika email storitev.
- Good, because je mogoče logiko email obvestil ločiti od ostale poslovne logike in jo ponovno uporabljati na različnih mestih aplikacije.
- Bad, because aplikacija potrebuje dostop do SMTP strežnika in njegove pravilne konfiguracije.
- Bad, because je treba podatke za dostop do SMTP strežnika varno hraniti v spremenljivkah okolja.
- Bad, because lahko nedosegljivost SMTP strežnika povzroči neuspešno pošiljanje obvestila, če napake niso ustrezno obravnavane.
