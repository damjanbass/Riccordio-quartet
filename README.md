# Riccordia Quartet — Website

Bilingual (Serbian / English) single-page website for Riccordia Quartet.
Static HTML / CSS / JS. No build step.

---

## SR — Kako pokrenuti i kako uneti sadržaj

### Pokretanje lokalno
1. Otvorite `index.html` direktno u pregledaču
   ili
2. U folderu projekta pokrenite:
   ```
   python -m http.server 8000
   ```
   pa otvorite `http://localhost:8000`.

### Gde se unosi sadržaj

| Šta | Gde u `index.html` | Kako pronaći |
|---|---|---|
| **Biografije članova** (4) | u sekciji `#biografije` | tražite komentare `BIOGRAFIJA:` |
| **Portreti članova** (4) | u sekciji `#ansambl`, `<img src=...>` | tražite komentare `TODO:` |
| **Datumi koncerata** (3) | u sekciji `#koncerti` | tražite komentar `KONCERTI:` |
| **Kontakt menadžmenta** | u sekciji `#kontakt` | tražite komentar `KONTAKT:` |
| **Pull quote i credentials** | sekcija `#identitet` | direktno editujte tekst u `data-sr`/`data-en` |
| **Citati štampe** | sekcija `#stampa` | direktno editujte `data-sr`/`data-en` |
| **Diskografija** | sekcija `#snimci` | tražite komentar `SNIMCI:` |

### Pravilo za dvojezični tekst
Svaki tekst ima dva atributa: `data-sr="..."` i `data-en="..."`.
Kada menjate tekst, ažurirajte **obe verzije**.

Primer:
```html
<p data-sr="Naša srpska verzija." data-en="Our English version.">Naša srpska verzija.</p>
```

### Stilovi i boje
Sve boje, fontovi i razmaci definisani su u `:root` na vrhu `styles.css`.
Promenite jednu varijablu — promenila se svuda.

---

## EN — How to run and edit content

### Run locally
1. Open `index.html` directly in a browser
   or
2. From the project folder run:
   ```
   python -m http.server 8000
   ```
   then open `http://localhost:8000`.

### Where to add content

| What | Where in `index.html` | How to find |
|---|---|---|
| **Member biographies** (4) | section `#biografije` | search for `BIOGRAPHY:` comments |
| **Member portraits** (4) | section `#ansambl`, `<img src=...>` | search for `TODO:` comments |
| **Concert dates** (3) | section `#koncerti` | search for `CONCERTS:` comment |
| **Management contact** | section `#kontakt` | search for `CONTACT:` comment |
| **Pull quote & credentials** | section `#identitet` | edit `data-sr`/`data-en` directly |
| **Press quotes** | section `#stampa` | edit `data-sr`/`data-en` directly |
| **Discography** | section `#snimci` | search for `RECORDINGS:` comment |

### Bilingual text rule
Every text node carries `data-sr="..."` and `data-en="..."`.
When editing, update **both**.

### Styling
All colors, fonts and spacing live in `:root` at the top of `styles.css`.
Change one variable — it propagates everywhere.

---

## Deployment

Drag-and-drop the three files (`index.html`, `styles.css`, `script.js`) to:
- Netlify Drop (https://app.netlify.com/drop)
- Vercel
- GitHub Pages
- any static host

No build pipeline. No dependencies.
