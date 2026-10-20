# Uporaba PostgreSQL za podatkovno bazo

## Context and Problem Statement

Aplikacija ServisDesk potrebuje podatkovno bazo za trajno shranjevanje uporabnikov, servisnih zahtevkov, zgodovine sprememb in podatkov o naloženih fotografijah.

Podatkovni model vsebuje več med seboj povezanih entitet: User, ServiceRequest, ServiceHistory in ServiceImage. Fotografije ne bodo shranjene neposredno v podatkovni bazi, ampak v Docker volume, medtem ko bo entiteta ServiceImage hranila podatke o fotografiji in pot do datoteke.

Zato je treba izbrati podatkovno bazo, ki dobro podpira relacije med entitetami, tuje ključe, integriteto podatkov in strukturirane poizvedbe.

## Considered Options

- PostgreSQL
- MySQL
- MongoDB

## Decision Outcome

Chosen option: "PostgreSQL", because podatkovni model aplikacije temelji na jasno definiranih relacijah med entitetami User, ServiceRequest, ServiceHistory in ServiceImage.

PostgreSQL omogoča uporabo primarnih in tujih ključev, s katerimi je mogoče zagotoviti povezave med uporabniki, servisnimi zahtevki, zgodovino sprememb ter fotografijami, ki pripadajo posameznemu zahtevku.

### Consequences

- Good, because relacijski model ustreza povezavam med entitetami User, ServiceRequest, ServiceHistory in ServiceImage.
- Good, because primarni in tuji ključi omogočajo zagotavljanje referenčne integritete med povezanimi podatki.
- Good, because transakcije omogočajo varno izvedbo več povezanih sprememb podatkov kot del ene logične operacije.
- Good, because PostgreSQL omogoča nadaljnjo razširitev podatkovnega modela in dodajanje novih tabel ter povezav.
- Bad, because je treba vnaprej definirati strukturo tabel in relacije med njimi.
- Bad, because spremembe podatkovnega modela zahtevajo migracije oziroma usklajevanje strukture baze.
- Bad, because je upravljanje relacijske baze nekoliko zahtevnejše kot uporaba zelo preprostega datotečnega ali dokumentnega shranjevanja.
