# Blackvoid Static Website

## Design update
The default website theme is now a **lighter off-white / white interface** with black text and restrained lime-green accents.

A **theme switcher** is included in the header:
- Light theme — default
- Black theme — darker version

The selected theme is stored in `localStorage`, so it remains after navigation/reloading.

## Structure

blackvoid/
├── index.html
├── work.html
├── products.html
├── about.html
├── contact.html
├── components/
│   ├── header.html
│   └── footer.html
├── css/
│   └── style.css
├── js/
│   ├── components.js
│   └── main.js
└── assets/
    └── images/
        ├── projects/
        ├── products/
        └── team/

## Run

Use VS Code + Live Server, or:

python -m http.server 5500

Then visit http://localhost:5500

A local server is recommended because `components.js` loads the separate header/footer HTML files with `fetch()`.

## Replace before launch

- Team names/photos
- Project names, descriptions and screenshots
- Product names, descriptions and screenshots
- Email address
- LinkedIn / Instagram / GitHub links
- Placeholder logo B with the final Blackvoid logo when ready

The contact form is front-end only and must be connected to an email service or backend before production.
