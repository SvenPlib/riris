# Uporaba Docker in Docker Compose za lokalni razvoj

## Context and Problem Statement

Aplikacija ServisDesk je sestavljena iz več ločenih delov: čelnega dela, zalednega dela in podatkovne baze PostgreSQL. Za lokalni razvoj je treba zagotoviti enoten način zagona vseh delov aplikacije in njihove medsebojne komunikacije.

Razvojno okolje mora biti čim manj odvisno od programske opreme, ki je nameščena na računalniku razvijalca.

## Considered Options

- Docker z Docker Compose
- ročni lokalni zagon posameznih delov aplikacije

## Decision Outcome

Chosen option: "Docker z Docker Compose", because Docker omogoča izvajanje čelnega dela, zalednega dela in podatkovne baze v ločenih vsebnikih z lastnimi odvisnostmi.

Docker Compose omogoča, da se konfiguracija vseh vsebnikov, njihovih omrežij, vrat, spremenljivk okolja in trajnih podatkov definira na enem mestu in se celotna aplikacija zažene z enim ukazom.

## Consequences

- Good, because posamezni deli aplikacije se izvajajo v ločenih, izoliranih okoljih.
- Good, because Docker Compose omogoča enoten in ponovljiv način zagona celotne aplikacije.
- Good, because razvijalcu ni treba vseh uporabljenih tehnologij in storitev nameščati neposredno na lokalni računalnik.
- Good, because lahko posamezne storitve po potrebi neodvisno ponovno zaženemo ali zamenjamo.
- Bad, because je za lokalni razvoj potrebna nameščena in delujoča Docker platforma.
- Bad, because konfiguracija omrežij, volumnov in spremenljivk okolja poveča začetno kompleksnost projekta.
- Bad, because Docker vsebniki porabijo dodatne sistemske vire v primerjavi z neposrednim zagonom aplikacije.
