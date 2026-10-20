# Shranjevanje fotografij v Docker volume

## Context and Problem Statement

Uporabniki aplikacije ServisDesk lahko servisnim zahtevkom priložijo fotografije okvarjenih naprav. Potrebno je določiti način trajnega shranjevanja naloženih fotografij.

Podatkovna baza že vsebuje entiteto ServiceImage, ki hrani podatke o fotografiji in povezavo s servisnim zahtevkom. Potrebno je določiti, ali bodo v podatkovni bazi shranjene tudi same fotografije ali samo podatki o njih.

## Considered Options

- shranjevanje fotografij v Docker volume in poti do datoteke v PostgreSQL
- shranjevanje fotografij neposredno v PostgreSQL
- uporaba zunanje storitve za shranjevanje datotek oziroma object storage

## Decision Outcome

Chosen option: "shranjevanje fotografij v Docker volume in poti do datoteke v PostgreSQL", because fotografij ni potrebno shranjevati kot binarne podatke neposredno v relacijski podatkovni bazi.

Fotografije bodo fizično shranjene v Docker volume, ki omogoča hranjenje datotek tudi po ponovnem zagonu oziroma ponovni izdelavi vsebnika. Entiteta ServiceImage bo v PostgreSQL hranila ime datoteke, pot do datoteke, čas nalaganja in povezavo s servisnim zahtevkom.

## Consequences

- Good, because velike slikovne datoteke niso shranjene neposredno v relacijski podatkovni bazi.
- Good, because Docker volume omogoča trajno shranjevanje fotografij neodvisno od življenjskega cikla vsebnikov.
- Good, because ServiceImage omogoča povezavo posamezne fotografije s servisnim zahtevkom preko `serviceRequestId`.
- Good, because je mogoče podatke o fotografijah poizvedovati preko PostgreSQL, same datoteke pa ostanejo ločeno shranjene.
- Bad, because je treba zagotavljati usklajenost med zapisom ServiceImage v podatkovni bazi in dejansko datoteko v Docker volume.
- Bad, because je treba pri izdelavi varnostne kopije upoštevati tako podatkovno bazo kot Docker volume.
