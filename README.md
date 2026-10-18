# Vince Dancel | Developer & Designer Portfolio

A personal portfolio for **Vincent Ric H. Dancel**, a web developer and UI/UX designer based in the Philippines. Built with React and Vite, the site brings together selected projects, work experience, technical skills, achievements, and contact information in an interactive, responsive experience.

## Features

- **Branded loading screen** that prepares the opening background and fonts before revealing the homepage.
- **Animated hero** with word reveals, scroll-driven headline transitions, and an interactive light-pillar background.
- **About section** with a draggable 3D ID lanyard that can be flipped to show the back.
- **Selected projects** with screenshots, technology lists, and links to repositories, demos, design files, and downloads.
- **Work experience timeline** with scroll-driven reveals and interactive cards.
- **Technology marquee** with draggable rows and a pause/resume control.
- **Achievements gallery** with certificate previews and links to available PDF certificates.
- **Services and contact sections** with an animated background and direct email and social links.
- **Responsive navigation**, keyboard focus states, a skip-to-content link, and reduced-motion support.

## Selected projects

| Project | Description | Technologies |
| --- | --- | --- |
| IntraVision-AI | Intramurals management and scoring system for Cor Jesu College. | React, JavaScript, Python, IndexedDB, APIs, Supabase |
| CineRealm | Interface design and interactive prototype. | Figma |
| Data Analytics - Excel | Data analysis workbook with dashboard and visual reporting. | Microsoft Excel |
| QR Bus Transportation System | QR-based transportation system across mobile and web. | Flutter, React, Supabase |

Project descriptions, screenshots, and outbound links are maintained in [src/data/portfolio.js](./src/data/portfolio.js).

## Technology stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based interface |
| Vite 7 | Development server and production build |
| React Router 7 | Homepage, project details, and not-found routing |
| GSAP, ScrollTrigger, SplitText | Entrance animations, text reveals, and scroll interactions |
| Motion | Scroll-responsive technology marquee |
| Three.js | Interactive 3D lanyard |
| OGL and WebGL | Certificate carousel and shader-based visual effects |
| CSS | Layout, responsive styles, and interface transitions |

## Getting started

### Requirements

- Node.js **22.12 or newer**, or Node.js **20.19 or newer within the 20.x release line**.
- npm, included with Node.js.

### Install and run

From the project directory:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

The portfolio runs entirely in the browser. No environment variables, API keys, or separate backend are required.

### Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload. |
| `npm run build` | Generate the production site in `dist/`. |
| `npm run preview` | Serve the production build locally for review. |

To check the production version:

```bash
npm run build
npm run preview
```

## Project structure

```text
Portfolio_DancelF/
├── public/
│   ├── Projects/          # Project screenshots and background video
│   ├── certificates/      # Certificate images, PDF files, and previews
│   ├── tech/              # Technology logos and attribution
│   └── ...                # Portrait, lanyard textures, and fallback image
├── src/
│   ├── components/        # Page sections and reusable visual effects
│   ├── data/              # Profile, projects, experience, and achievements
│   ├── hooks/             # Loading, viewport, and reduced-motion behavior
│   ├── pages/             # Homepage, project details, and not-found page
│   ├── styles/            # Global and portfolio styles
│   ├── App.jsx            # Routes and initial loading state
│   └── main.jsx           # React entry point
├── index.html             # Page metadata and initial loading screen
├── package.json
├── vercel.json            # SPA rewrite for Vercel
└── vite.config.js
```

## Customize the portfolio

| Content | Where to edit |
| --- | --- |
| Name, biography, email, social links, and projects | [src/data/portfolio.js](./src/data/portfolio.js) |
| Employment history and responsibilities | [src/data/experience.js](./src/data/experience.js) |
| Achievements and certificate links | [src/data/achievements.js](./src/data/achievements.js) |
| Technologies and logo rows | [src/components/TechStack.jsx](./src/components/TechStack.jsx) |
| Service descriptions | [src/components/Services.jsx](./src/components/Services.jsx) |
| Loading-screen appearance and page metadata | [index.html](./index.html) |
| Loading readiness and transition timing | [src/hooks/useOpeningLoader.js](./src/hooks/useOpeningLoader.js) |
| Shared colors, layout, and responsive styles | [src/styles/portfolio.css](./src/styles/portfolio.css) and [src/styles/global.css](./src/styles/global.css) |

Place new assets in `public/` and reference them with paths such as `/Projects/example.png`. Keep filename capitalization consistent with the asset on disk.

Individual project pages use `/lab/:projectSlug`. For example, `/lab/intravision-ai` displays the project whose `slug` is `intravision-ai`.

## Loading and performance

The loading screen is part of the initial HTML, so it can appear before React starts. On the homepage, it waits for the opening background to report readiness, the fonts to settle, and the fallback image to decode. It then fades away and allows the headline entrance to begin.

Heavier visuals, including the 3D portrait, achievements carousel, and contact effect, load as their sections approach the viewport. The hero background uses capped render sizes and adaptive resolution to limit graphics work on large or high-DPI screens. A Canvas 2D fallback is available when the hero's WebGL renderer cannot run.

The interface also respects the system's reduced-motion preference. The technology marquee provides its own pause control.

## Deployment

Build the static site with `npm run build`, then deploy the generated `dist/` directory.

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output / publish directory | `dist` |

SPA routing is already configured for Vercel through [vercel.json](./vercel.json) and for Netlify through [public/_redirects](./public/_redirects). Preserve these rules so direct visits and refreshes on `/lab/...` routes resolve correctly.

Before publishing, check the loading-to-homepage transition, mobile navigation, project links, certificate downloads, and contact links. Also refresh a project detail URL directly to verify routing.

## Author and credits

**Vincent Ric H. Dancel** — Web Developer & UI/UX Designer

- [GitHub](https://github.com/vincentdancel)
- [Email](mailto:vincentdancel692@gmail.com)
- [Instagram](https://instagram.com/beanssss_d)

Technology logo sources and their licenses are documented in [public/tech/ATTRIBUTION.md](./public/tech/ATTRIBUTION.md).
