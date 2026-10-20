# Uporaba REST API za komunikacijo med čelnim in zalednim delom

## Context and Problem Statement

Aplikacija ServisDesk ima ločen čelni del v Reactu in zaledni del v Node.js z Express. Potrebno je določiti način komunikacije med obema deloma aplikacije.

Čelni del mora zalednemu delu pošiljati zahteve za prijavo uporabnikov, pridobivanje in ustvarjanje servisnih zahtevkov, spreminjanje statusov, nalaganje fotografij ter druge funkcionalnosti aplikacije.

## Considered Options

- REST API
- GraphQL API

## Decision Outcome

Chosen option: "REST API", because omogoča jasno ločitev čelnega dela od zalednega dela aplikacije in uporabo standardnih HTTP metod za komunikacijo med njima.

Podatki se bodo med čelnim in zalednim delom praviloma izmenjevali v obliki JSON. Express omogoča preprosto definiranje REST endpointov, ki jih lahko React uporablja preko HTTP zahtevkov.

## Consequences

- Good, because sta čelni in zaledni del jasno ločena in se lahko razvijata neodvisno.
- Good, because REST uporablja standardne HTTP metode, kot so GET, POST, PUT, PATCH in DELETE.
- Good, because lahko isti API v prihodnosti uporablja tudi druga odjemalska aplikacija.
- Good, because je posamezne API endpointe mogoče neodvisno testirati.
- Good, because se REST API neposredno ujema z izbrano kombinacijo React ter Node.js z Express.
- Bad, because je treba vzdrževati jasno definiran dogovor o strukturi zahtevkov in odgovorov med čelnim in zalednim delom.
- Bad, because lahko določeni uporabniški pogledi zahtevajo več zaporednih HTTP zahtevkov.
- Bad, because spremembe API endpointov lahko zahtevajo tudi prilagoditev čelnega dela aplikacije.
