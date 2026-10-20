# Uporaba JWT in bcrypt za avtentikacijo

## Context and Problem Statement

Aplikacija ServisDesk ima več uporabniških vlog: CUSTOMER, TECHNICIAN in ADMIN. Sistem mora zato omogočati prijavo uporabnikov, varno preverjanje njihove identitete ter omejevanje dostopa do posameznih funkcionalnosti glede na uporabniško vlogo.

Gesla uporabnikov ne smejo biti shranjena v berljivi obliki, zaledni del pa mora pri vsakem zaščitenem zahtevku preveriti, ali je uporabnik prijavljen in kakšne pravice ima.

## Considered Options

- JWT za avtentikacijo in bcrypt za zgoščevanje gesel
- strežniške seje z uporabo session cookie

## Decision Outcome

Chosen option: "JWT in bcrypt", because JWT omogoča stateless avtentikacijo, pri kateri zaledni del ne potrebuje shranjevati uporabniške seje na strežniku. Žeton se po uspešni prijavi uporablja za preverjanje identitete uporabnika pri nadaljnjih zahtevkih.

Za shranjevanje gesel bo uporabljen bcrypt, ker je namenjen varnemu zgoščevanju gesel, kar oteži vdor v osebne podatke.

## Consequences

- Good, because backend pri uporabi JWT ne potrebuje vzdrževati strežniških sej za posamezne uporabnike.
- Good, because JWT omogoča prenos podatkov o identiteti in uporabniški vlogi v podpisanem žetonu.
- Good, because je mogoče dostop do posameznih API endpointov omejiti glede na vlogo uporabnika.
- Good, because bcrypt uporablja salt, zato enaka gesla ne ustvarijo enakih zgoščenih vrednosti.
- Good, because je mogoče prilagoditi strošek bcrypt algoritma in s tem povečati zahtevnost preverjanja gesel za napadalca.
- Bad, because že izdanega JWT žetona praviloma ni mogoče preprosto preklicati pred njegovim potekom brez dodatnega mehanizma.
- Bad, because lahko predolga življenjska doba JWT žetona poveča varnostno tveganje v primeru kraje žetona.
- Bad, because višji bcrypt cost poveča varnost, vendar hkrati podaljša čas izračuna pri prijavi in registraciji.
