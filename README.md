# Goshgar Hasanov — Personal CV Site

Live: **https://goshgarhasanov.github.io**

A single-page static CV / portfolio for **Goshgar Hasanov**, Fullstack Developer.

## Stack
- HTML5 / CSS3 / Vanilla JavaScript — no build step
- [Devicon](https://devicon.dev/) for tech logos
- Google Fonts (Inter)
- Four languages (EN / AZ / RU / TR), remembered in localStorage
- Follows the system light / dark preference
- Print stylesheet: Ctrl+P produces a clean A4 CV
- Fully responsive
- Hosted on GitHub Pages

## The PDF CV
`assets/Goshgar_Hasanov_CV.pdf` is generated from `cv.html`, so it and the site
are the same document in two forms — edit `cv.html` and run:

```bash
npm install     # once, pulls playwright-core (uses the Chrome already installed)
npm run cv      # cv.html -> assets/Goshgar_Hasanov_CV.pdf
```

Keep it to one page: `cv.html` lists roles with dates and titles only, with the
detail left to the site.

## Structure
```
.
├── index.html
├── cv.html          # printable CV, same design language
├── styles.css
├── script.js
├── i18n.js          # EN / AZ / RU / TR strings
├── scripts/
│   └── build-cv.mjs # renders cv.html to PDF
└── assets/
    ├── profile.jpg
    └── Goshgar_Hasanov_CV.pdf
```

## Local preview
Just open `index.html` in a browser, or:
```bash
python3 -m http.server 8000
```

## Contact
- Email: goshgarhasanov321@gmail.com
- GitHub: [@goshgarhasanov](https://github.com/goshgarhasanov)
