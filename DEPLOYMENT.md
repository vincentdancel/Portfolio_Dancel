# Deployment guide

The portfolio is a Vite-generated static site. Deploy the `dist` output after a successful production build.

## Preflight

Run these commands from the project root:

```bash
npm install
npm run build
npm run preview
```

Open the preview address Vite reports and check the following before publishing:

- The hero, project cards, and contact links work on a narrow mobile viewport and desktop viewport.
- Each external project, GitHub, email, and social link resolves to the intended public destination.
- Direct navigation to each internal case-study URL works after refresh.
- The README preview exists at `public/portfolio-preview.svg`.

The project does not require environment variables. Do not add secrets to the repository merely to deploy a static portfolio.

## Deploy with Vercel

1. Push the finished project to a public GitHub repository and verify the remote URL before connecting it.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Let Vercel detect **Vite**, or set the following values manually:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Install command | `npm install` |

4. Deploy, then open the generated `*.vercel.app` URL in a private/incognito window.
5. The required BrowserRouter rewrite is already committed as `vercel.json`. Keep it in the repository so direct visits to project-study routes resolve to `index.html`.
6. Copy the real production URL into `README.md`, the GitHub profile, and the class-channel submission.

## Deploy with Netlify

### Git-based deployment

1. Push the project to the verified public GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Set these build settings if they are not filled automatically:

   | Setting | Value |
   | --- | --- |
   | Build command | `npm run build` |
   | Publish directory | `dist` |

4. Click **Deploy site** and test the assigned `*.netlify.app` address.

### Manual deployment

1. Run `npm run build` locally.
2. In Netlify, choose the option to deploy manually.
3. Upload the contents of the generated `dist` directory.

### SPA routing on Netlify

The BrowserRouter redirect is already committed as `public/_redirects`, so a refreshed internal route will not return a 404:

```text
# public/_redirects
/*    /index.html   200
```

Vite copies `public/_redirects` into `dist/_redirects` during the build. Keep the file when deploying. This rule is not needed for hash-based routing.

## Post-deployment checklist

- Test the root page and every case-study URL in a private browser window.
- Test the email link and all outbound GitHub/social links on mobile and desktop.
- Confirm there is no broken image, including the README preview asset.
- Put the actual deployment URL in the README—do not leave an invented or unverified URL.
- Make the GitHub repository public only after reviewing that it contains no credentials or private information.
