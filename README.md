# Naeem Roussas — Academic Portfolio

Static academic portfolio for GitHub Pages. The site presents research, education,
experience, projects, credentials, technical profiles, and contact links for
graduate-school and research conversations.

## Project structure

```text
.
├── index.html                 # Main portfolio
├── academic-cv.html           # Web CV
├── faculty-cold-email.txt     # Reusable faculty outreach draft
├── styles.css                 # Site-wide styling and responsive layout
├── script.js                  # Navigation, animations, and Three.js scenes
├── assets/
│   ├── cert-*.png             # Certification artwork
│   └── papers/                # Research PDFs and plans
├── tools/                     # Standalone copies of the featured tools
│   ├── aegis-loop/
│   ├── ghostnic/
│   ├── edgesight/
│   └── qxdp/
└── .github/workflows/
    └── pages.yml              # GitHub Pages deployment
```

## Run locally

From the project directory:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Deploy with GitHub Pages

1. Push this directory to a GitHub repository.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Push to `main`; the included workflow publishes the site.

The site has no build step or package dependencies. Three.js is loaded from the
jsDelivr CDN at runtime, while all portfolio content and paper assets remain in
the repository.

## Custom domain

The site is configured for `naeemroussas.tech` through the root `CNAME` file.
The public site URL is <https://naeemroussas.tech/>.
At the domain registrar, configure:

- `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, and `185.199.111.153`
- A `CNAME` record for `www` pointing to `naeemjr.github.io`

After DNS updates, set the same domain under **Repository Settings → Pages** and
enable **Enforce HTTPS** when GitHub makes it available.

## Editing guide

Most edits only require opening `index.html`:

- **Personal details:** edit the Hero and About sections near the top.
- **Education:** copy an existing `.education-item` inside Education.
- **Experience:** copy an existing `.timeline-item` inside Experience.
- **Research:** copy an existing `.publication-item` inside Research.
- **Projects:** copy an existing `.project-card` inside Projects.
- **Technical profiles:** edit the URLs in the Technical section.
- **Certifications:** copy a `.certification-card`, update its image, title, and
  `data-cert-detail` text, then add the matching image under `assets/`.

Keep section IDs (`about`, `research`, `education`, and so on) unchanged unless
you also update the matching navigation link and the title map in `script.js`.
Use relative paths such as `assets/papers/example.pdf` so GitHub Pages works from
any repository name.
