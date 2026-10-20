# Funkcionalnosti in obseg rešitve

## Uporabniške vloge

### Stranka

Stranka prijavi okvaro gospodinjskega aparata in spremlja svoje servisne zahtevke.

Stranka lahko:

- se registrira in prijavi v sistem,
- ustvari nov servisni zahtevek,
- izbere vrsto gospodinjskega aparata,
- vnese podatke o napravi,
- opiše težavo,
- spremlja status svojega zahtevka,
- pregleda zgodovino svojih zahtevkov, vključno s podrobnostmi posameznega zahtevka,
- naloži fotografije okvarjene naprave ob prijavi servisnega zahtevka,
- prejema e-poštna obvestila ob spremembi statusa svojega zahtevka.

Stranka ne more:

- pregledovati zahtevkov drugih uporabnikov,
- dodeljevati zahtevkov serviserjem,
- upravljati drugih uporabnikov.

### Serviser

Serviser obravnava servisne zahtevke, ki so mu bili dodeljeni.

Serviser lahko:

- se prijavi v sistem,
- pregleduje njemu dodeljene zahtevke,
- spremeni status zahtevka,
- ob posameznem koraku obravnave doda komentar oziroma opombo,
- vnese opis izvedenega popravila,
- označi zahtevek kot rešen,
- pregleda podatke o napravi, opis težave in priložene fotografije.

Serviser ne more:

- upravljati uporabniških računov,
- pregledovati zahtevkov, ki mu niso bili dodeljeni,
- spreminjati podatkov drugih uporabnikov.

### Administrator

Administrator upravlja delovanje sistema in ima pregled nad vsemi servisnimi zahtevki.

Administrator lahko:

- se prijavi v sistem,
- pregleduje vse servisne zahtevke,
- dodeljuje zahtevke posameznim serviserjem,
- spreminja status,
- ob dodelitvi in dokončnem zaprtju zahtevka lahko doda komentar oziroma opombo,
- pregleduje podatke o strankah in serviserjih,
- spremlja stanje vseh aktivnih zahtevkov,
- dokončno zapre rešene servisne zahtevke.

Administrator nima omejitev glede pregleda in upravljanja servisnih zahtevkov, vendar ne izvaja servisnih posegov namesto serviserja.

---

## Predvidene funkcionalnosti

1. Registracija stranke in prijava uporabnika v sistem.
2. Ustvarjanje novega servisnega zahtevka.
3. Izbira vrste gospodinjskega aparata in vnos podatkov o napravi.
4. Nalaganje fotografij okvarjene naprave ob servisnem zahtevku.
5. Pregled lastnih servisnih zahtevkov.
6. Pregled vseh servisnih zahtevkov za administratorja.
7. Dodelitev servisnega zahtevka posameznemu serviserju.
8. Spreminjanje statusa servisnega zahtevka.
9. Pošiljanje e-poštnih obvestil ob spremembi statusa zahtevka.
10. Dodajanje komentarjev k servisnemu zahtevku ob posameznem koraku.
11. Vnos zaključnega komentarja z opisom izvedenega popravila.
12. Označitev zahtevka kot rešenega s strani serviserja.
13. Zaključek servisnega zahtevka s strani administratorja.
14. Filtriranje zahtevkov glede na status.
15. Pregled zgodovine servisnega zahtevka.

---

## MVP funkcionalnosti

Za prvo delujočo različico bodo vključene naslednje ključne funkcionalnosti:

- **MVP - Registracija in prijava uporabnika v sistem**
- **MVP – Ustvarjanje novega servisnega zahtevka**
- **MVP – Pregled servisnih zahtevkov**
- **MVP – Dodelitev zahtevka serviserju**
- **MVP – Spreminjanje statusa servisnega zahtevka**
- **MVP – Dodajanje komentarjev k zahtevku**
- **MVP – Vnos rešitve in zaključek servisnega zahtevka s strani serviserja**
- **MVP – Zaključek rešenega servisnega zahtevka s strani administratorja**

Med navedenimi so domensko specifične predvsem dodelitev zahtevka serviserju, sprememba statusa servisnega zahtevka in vnos/opis rešitve ter zaključek zahtevka.

---

## Kasnejše nadgradnje

V prihodnjih različicah bi bilo mogoče rešitev nadgraditi z naslednjimi funkcionalnostmi:

1. Samodejno dodeljevanje zahtevkov serviserjem glede na vrsto naprave.
2. Pregled statistike o številu odprtih, rešenih in zaključenih zahtevkov.
3. Ocenjevanje zadovoljstva stranke po zaključenem servisu.
4. Možnost izbire termina servisnega obiska.
5. Pošiljanje opomnikov za nerešene oziroma dalj časa neaktivne servisne zahtevke.

---

## Out of scope

V okviru prve različice projekta ne bodo implementirane naslednje funkcionalnosti:

- spletno plačevanje servisnih storitev,
- mobilna aplikacija za Android ali iOS,
- videoklic med stranko in serviserjem,
- povezava z zunanjimi servisi ali sistemi proizvajalcev gospodinjskih aparatov.
