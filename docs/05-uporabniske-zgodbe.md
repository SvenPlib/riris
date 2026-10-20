# Uporabniške zgodbe

## US-01 – Registracija stranke in prijava uporabnika

**Povezana funkcionalnost:** Registracija stranke in prijava uporabnikov v sistem  
**Uporabniška vloga:** Stranka, serviser, administrator

**Uporabniška zgodba:**  
Kot uporabnik želim dostopati do sistema z uporabniškim računom, da lahko uporabljam funkcionalnosti, ki pripadajo moji uporabniški vlogi.

### Acceptance criteria

- Nova stranka se lahko registrira z imenom, priimkom, elektronskim naslovom in geslom.
- Ob uspešni registraciji sistem ustvari uporabniški račun z vlogo `CUSTOMER`.
- Registracija ni mogoča, če uporabnik z vnesenim elektronskim naslovom že obstaja.
- Registriran uporabnik se lahko prijavi z veljavnim elektronskim naslovom in geslom.
- Po uspešni prijavi sistem uporabniku omogoči dostop samo do funkcionalnosti, dovoljenih njegovi uporabniški vlogi.

---

## US-02 – Ustvarjanje servisnega zahtevka

**Povezana funkcionalnost:** Ustvarjanje novega servisnega zahtevka  
**Uporabniška vloga:** Stranka

**Uporabniška zgodba:**  
Kot stranka želim ustvariti nov servisni zahtevek, da lahko servisnemu podjetju prijavim okvaro gospodinjskega aparata.

### Acceptance criteria

- Prijavljena stranka lahko ustvari nov servisni zahtevek.
- Zahtevka ni mogoče oddati, če obvezni podatki niso izpolnjeni.
- Po uspešni oddaji sistem ustvari servisni zahtevek s statusom `NEW`.
- Ustvarjeni zahtevek je povezan s stranko, ki ga je oddala.
- Novo ustvarjeni zahtevek je viden stranki in administratorju.

---

## US-03 – Izbira vrste aparata in vnos podatkov o napravi

**Povezana funkcionalnost:** Izbira vrste gospodinjskega aparata in vnos podatkov o napravi  
**Uporabniška vloga:** Stranka

**Uporabniška zgodba:**  
Kot stranka želim pri prijavi okvare izbrati vrsto gospodinjskega aparata ter vnesti podatke o napravi in opis težave, da ima servisno podjetje potrebne informacije za obravnavo zahtevka.

### Acceptance criteria

- Stranka lahko pri ustvarjanju zahtevka izbere vrsto gospodinjskega aparata.
- Na voljo so vrste `REFRIGERATOR`, `WASHING_MACHINE`, `DISHWASHER`, `DRYER`, `OVEN` in `FREEZER`.
- Stranka lahko vnese znamko in model naprave ter opis težave.
- Izbrana vrsta aparata in vneseni podatki se shranijo skupaj s servisnim zahtevkom.
- Dodeljeni serviser lahko vidi podatke o napravi in opis težave.

---

## US-04 – Nalaganje fotografij okvarjene naprave

**Povezana funkcionalnost:** Nalaganje fotografij okvarjene naprave ob servisnem zahtevku  
**Uporabniška vloga:** Stranka

**Uporabniška zgodba:**  
Kot stranka želim ob prijavi servisnega zahtevka priložiti fotografije okvarjene naprave, da lahko serviser lažje oceni težavo.

### Acceptance criteria

- Stranka lahko ob ustvarjanju servisnega zahtevka naloži eno ali več fotografij okvarjene naprave.
- Naložene fotografije se povežejo z ustreznim servisnim zahtevkom.
- Fotografije se fizično shranijo v Docker volume, v podatkovno bazo pa se shrani pot do posamezne fotografije.
- Servisni zahtevek je mogoče oddati tudi brez priložene fotografije.
- Dodeljeni serviser lahko pri podrobnostih zahtevka pregleda priložene fotografije.

---

## US-05 – Pregled lastnih servisnih zahtevkov

**Povezana funkcionalnost:** Pregled lastnih servisnih zahtevkov  
**Uporabniška vloga:** Stranka

**Uporabniška zgodba:**  
Kot stranka želim pregledovati svoje servisne zahtevke, da lahko spremljam stanje prijavljenih okvar.

### Acceptance criteria

- Stranka vidi samo servisne zahtevke, ki jih je sama ustvarila.
- Pri vsakem zahtevku je prikazan njegov trenutni status.
- Stranka lahko odpre posamezen zahtevek in pregleda njegove podrobnosti.
- Stranka ne more dostopati do servisnih zahtevkov drugih strank.

---

## US-06 – Pregled vseh servisnih zahtevkov

**Povezana funkcionalnost:** Pregled vseh servisnih zahtevkov za administratorja  
**Uporabniška vloga:** Administrator

**Uporabniška zgodba:**  
Kot administrator želim pregledovati vse servisne zahtevke, da imam pregled nad trenutnim stanjem dela servisnega podjetja.

### Acceptance criteria

- Administrator lahko vidi vse servisne zahtevke v sistemu.
- Pri posameznem zahtevku lahko vidi podatke o napravi, status in dodeljenega serviserja.
- Administrator lahko odpre podrobnosti posameznega servisnega zahtevka.
- Administrator lahko vidi tudi zahtevke, ki še nimajo dodeljenega serviserja.
- Administrator lahko vidi priložene fotografije posameznega zahtevka.

---

## US-07 – Dodelitev servisnega zahtevka serviserju

**Povezana funkcionalnost:** Dodelitev servisnega zahtevka posameznemu serviserju  
**Uporabniška vloga:** Administrator

**Uporabniška zgodba:**  
Kot administrator želim servisni zahtevek dodeliti serviserju, da je jasno določeno, kdo bo obravnaval prijavljeno okvaro.

### Acceptance criteria

- Administrator lahko pri nedodeljenem servisnem zahtevku izbere serviserja.
- Izbrani serviser se shrani kot dodeljeni serviser servisnega zahtevka.
- Po dodelitvi se status zahtevka spremeni iz `NEW` v `ASSIGNED`.
- Dodeljeni zahtevek postane viden izbranemu serviserju.
- Dodelitev serviserja se zabeleži v zgodovino servisnega zahtevka.

---

## US-08 – Spreminjanje statusa servisnega zahtevka

**Povezana funkcionalnost:** Spreminjanje statusa servisnega zahtevka  
**Uporabniška vloga:** Serviser

**Uporabniška zgodba:**  
Kot serviser želim spreminjati status dodeljenega servisnega zahtevka, da lahko evidentiram trenutno fazo njegove obravnave.

### Acceptance criteria

- Serviser lahko spreminja status samo pri servisnih zahtevkih, ki so dodeljeni njemu.
- Serviser lahko zahtevek s statusom `ASSIGNED` spremeni v `IN_PROGRESS`.
- Novi status se po uspešni spremembi shrani v podatkovno bazo.
- Sprememba statusa se zabeleži v zgodovino servisnega zahtevka.
- Stranka po spremembi vidi posodobljen status svojega zahtevka.

---

## US-09 – Pošiljanje e-poštnih obvestil ob spremembi statusa

**Povezana funkcionalnost:** Pošiljanje e-poštnih obvestil ob spremembi statusa zahtevka  
**Uporabniška vloga:** Stranka

**Uporabniška zgodba:**  
Kot stranka želim ob spremembi statusa svojega servisnega zahtevka prejeti e-poštno obvestilo, da sem obveščena o poteku njegove obravnave.

### Acceptance criteria

- Sistem po uspešni spremembi statusa servisnega zahtevka sproži pošiljanje e-poštnega obvestila.
- E-poštno obvestilo se pošlje na elektronski naslov stranke, ki je ustvarila servisni zahtevek.
- E-poštno obvestilo vsebuje informacijo o novem statusu servisnega zahtevka.
- Obvestilo se pošlje samo ob dejanski spremembi statusa zahtevka.
- Stranka lahko po prejemu obvestila v aplikaciji vidi enak trenutni status zahtevka.

---

## US-10 – Dodajanje komentarjev k servisnemu zahtevku

**Povezana funkcionalnost:** Dodajanje komentarjev k servisnemu zahtevku ob posameznem koraku  
**Uporabniška vloga:** Serviser, administrator

**Uporabniška zgodba:**  
Kot uporabnik, ki obravnava servisni zahtevek, želim ob svoji akciji dodati komentar oziroma opombo, da lahko zabeležim pomembne informacije o poteku obravnave.

### Acceptance criteria

- Serviser lahko komentar doda samo servisnemu zahtevku, ki je dodeljen njemu.
- Administrator lahko komentar doda ob dodelitvi zahtevka serviserju ali ob dokončnem zaprtju zahtevka.
- Komentar se shrani v zgodovino servisnega zahtevka.
- Pri zapisu se shrani uporabnik, ki je komentar dodal, in čas nastanka zapisa.
- Dodani komentar ostane viden v zgodovini servisnega zahtevka.

---

## US-11 – Vnos zaključnega komentarja z opisom izvedenega popravila

**Povezana funkcionalnost:** Vnos zaključnega komentarja z opisom izvedenega popravila  
**Uporabniška vloga:** Serviser

**Uporabniška zgodba:**  
Kot serviser želim po opravljenem popravilu vnesti zaključni komentar z opisom izvedenega popravila, da je v zgodovini zahtevka zabeleženo, kako je bila okvara odpravljena.

### Acceptance criteria

- Serviser lahko zaključni komentar vnese samo pri servisnem zahtevku, ki je dodeljen njemu.
- Zaključni komentar vsebuje opis izvedenega popravila oziroma opravljenega servisnega posega.
- Zaključni komentar se shrani v zgodovino servisnega zahtevka.
- Pri zaključnem komentarju se shranita uporabnik, ki ga je dodal, ter čas nastanka zapisa.
- Zaključni komentar ostane viden pri pregledu zgodovine servisnega zahtevka.

---

## US-12 – Označitev servisnega zahtevka kot rešenega

**Povezana funkcionalnost:** Označitev zahtevka kot rešenega s strani serviserja  
**Uporabniška vloga:** Serviser

**Uporabniška zgodba:**  
Kot serviser želim po končanem popravilu označiti servisni zahtevek kot rešen, da administrator ve, da je servisni poseg zaključen.

### Acceptance criteria

- Serviser lahko kot rešen označi samo servisni zahtevek, ki je dodeljen njemu.
- Serviser lahko kot rešen označi zahtevek, ki je v statusu `IN_PROGRESS`.
- Pred označitvijo zahtevka kot rešenega mora biti vnesen zaključni komentar z opisom izvedenega popravila.
- Po označitvi se status servisnega zahtevka spremeni v `RESOLVED`.
- Sprememba statusa se zabeleži v zgodovino servisnega zahtevka.

---

## US-13 – Zaključek servisnega zahtevka

**Povezana funkcionalnost:** Zaključek servisnega zahtevka s strani administratorja  
**Uporabniška vloga:** Administrator

**Uporabniška zgodba:**  
Kot administrator želim pregledati rešen servisni zahtevek in ga dokončno zapreti, da je servisni postopek uradno zaključen.

### Acceptance criteria

- Administrator lahko dokončno zapre samo servisni zahtevek s statusom `RESOLVED`.
- Administrator lahko pred zaključkom pregleda zgodovino zahtevka in zaključni komentar serviserja.
- Po zaključku se status servisnega zahtevka spremeni v `CLOSED`.
- Sprememba statusa se zabeleži v zgodovino servisnega zahtevka.
- Serviser po dokončnem zaprtju zahtevka njegovega statusa ne more ponovno spremeniti v aktivno stanje.

---

## US-14 – Filtriranje servisnih zahtevkov glede na status

**Povezana funkcionalnost:** Filtriranje zahtevkov glede na status  
**Uporabniška vloga:** Administrator

**Uporabniška zgodba:**  
Kot administrator želim filtrirati servisne zahtevke glede na njihov status, da lahko hitro najdem zahtevke v določeni fazi obravnave.

### Acceptance criteria

- Administrator lahko kot filter izbere status `NEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED` ali `CLOSED`.
- Po izbiri statusa sistem prikaže samo servisne zahtevke z izbranim statusom.
- Administrator lahko filter odstrani in ponovno prikaže vse servisne zahtevke.
- Če za izbrani status ni servisnih zahtevkov, sistem prikaže obvestilo, da ni rezultatov.

---

## US-15 – Pregled zgodovine servisnega zahtevka

**Povezana funkcionalnost:** Pregled zgodovine servisnega zahtevka  
**Uporabniška vloga:** Stranka, serviser, administrator

**Uporabniška zgodba:**  
Kot uporabnik želim pregledati zgodovino servisnega zahtevka, da lahko spremljam potek njegove obravnave.

### Acceptance criteria

- Sistem pri servisnem zahtevku prikaže zgodovino njegovih sprememb.
- Pri spremembi statusa sta prikazana prejšnji in novi status.
- Pri posameznem zapisu sta prikazana datum in čas spremembe.
- Če je bil ob posameznem koraku dodan komentar, se ta prikaže ob ustreznem zapisu.
- Uporabnik lahko vidi zgodovino samo tistih servisnih zahtevkov, do katerih ima glede na svojo uporabniško vlogo pravico dostopa.
