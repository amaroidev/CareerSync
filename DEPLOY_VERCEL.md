Deployment to Vercel (production) — quick guide

Goal
- Publish the client to Vercel and enable Supabase authentication (Google, GitHub, Email).

Strategy
- Deploy the `client/` app to Vercel (Vite-based SPA).
- Configure environment variables in Vercel (use the same names the app reads: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Configure OAuth providers in the Supabase dashboard and add the Vercel production redirect URL(s).

Checklist
- [ ] Create a Vercel project from this repository, set the Root Directory to `client/` (so Vite builds the client app).
- [ ] Add the environment variables in Vercel (Production) listed below.
- [ ] In Supabase Dashboard -> Authentication -> Settings, configure Google and GitHub providers and set redirect URIs for both local dev and your Vercel production URL.
- [ ] Deploy using the Vercel dashboard or the Vercel CLI.

Environment variables (required on Vercel)
- NEXT_PUBLIC_SUPABASE_URL  (example: https://abcxyz.supabase.co)
- NEXT_PUBLIC_SUPABASE_ANON_KEY  (public anon key)

Optional (if you use server-side Supabase functions or server code):
- SUPABASE_SERVICE_ROLE_KEY (keep this secret, don't expose to client)
- DATABASE_URL (if server needs DB access)

Supabase OAuth redirect URIs you should add
- Local development (Vite): http://localhost:5173/dashboard
- Vercel production: https://<YOUR_VERCEL_PROJECT>.vercel.app/dashboard

Steps — UI (recommended)
1. Go to https://vercel.com/new and import the GitHub repository.
2. When prompted, set "Root Directory" (or Project Settings -> General -> Root Directory) to `client`.
3. In the Vercel project Settings -> Environment Variables, add the keys above (Production scope). Paste the values from your `.env`.
4. Deploy. Vercel will build the `client/` app using the detected Vite setup.

Steps — CLI (alternatively)
1. Install Vercel CLI: `npm i -g vercel`
2. From the repo root run (one-time):

```powershell
cd client
vercel login
vercel --prod --confirm
```

3. Add environment variables with the Vercel CLI (or set them in the dashboard):

```powershell
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

When asked, paste the values.

Configuring Supabase OAuth providers (Google / GitHub)
1. Open your Supabase project -> Authentication -> Providers.
2. For each provider (Google, GitHub) you'll need a Client ID and Client Secret. Create OAuth apps in each provider's developer console:
   - Google: https://console.cloud.google.com/apis/credentials
   - GitHub: https://github.com/settings/developers
3. In the provider setup in Supabase, paste the Client ID and Client Secret.
4. Add redirect URIs in the provider settings and in Supabase (if required). The important redirect URIs are:
   - http://localhost:5173/dashboard
   - https://<YOUR_VERCEL_PROJECT>.vercel.app/dashboard
5. Save the provider configuration.

Notes & troubleshooting
- Ensure the environment variable names match what the client uses (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). I updated the client code to also read `NEXT_PUBLIC_*` keys.
- After changing environment variables in Vercel, trigger a redeploy (Vercel redeploys automatically after value changes if requested).
- If OAuth redirect fails, check the Supabase logs and the provider's app settings for misconfigured redirect URIs.
- If you need server-side Supabase functionality (service role key), keep those keys secret and only add them to server environment variables (not `NEXT_PUBLIC_`).

If you want I can:
- Create a `vercel.json` with recommended settings for the `client` root (optional).
- Add example `vercel` CLI commands or a GitHub Actions workflow to auto-deploy on push to `main`.
- Walk through enabling Google/GitHub apps and add the exact redirect URIs.

## Example `vercel.json` (client root)

I added an example `client/vercel.json` suitable for a static Vite build. It makes sure client-side routing works by serving `index.html` for all routes.

File: `client/vercel.json`

```json
{
   "version": 2,
   "builds": [
      {
         "src": "package.json",
         "use": "@vercel/static-build"
      }
   ],
   "routes": [
      {
         "src": "/(.*)",
         "dest": "/index.html"
      }
   ]
}
```

## GitHub Actions: Auto-deploy `client/` to Vercel

I added a workflow `.github/workflows/deploy-client-vercel.yml` that builds the `client/` folder and deploys with the Vercel CLI on pushes to `main`.

Secrets to add in GitHub repo settings -> Secrets and variables -> Actions:

- `VERCEL_TOKEN` — a personal or deployment token from your Vercel account
- `VERCEL_ORG_ID` — Vercel organization id
- `VERCEL_PROJECT_ID` — Vercel project id

The workflow installs dependencies inside `client/`, builds, then runs `vercel --prod` with the provided secrets.

## Creating OAuth apps (Google & GitHub) and wiring redirect URIs

Below are concise, clear steps to create OAuth apps and add redirect URIs in the provider consoles and Supabase. Use these two redirect URIs:

- Local dev: `http://localhost:5173/dashboard`
- Production: `https://<your-vercel-project>.vercel.app/dashboard`

Replace `<your-vercel-project>` with your Vercel project domain.

### GitHub OAuth app

1. Go to GitHub -> Settings -> Developer settings -> OAuth Apps -> New OAuth App.
2. Application name: e.g. "CareerSync".
3. Homepage URL: `https://<your-vercel-project>.vercel.app` (or `http://localhost:5173` while testing).
4. Authorization callback URL: add both URIs:
    - `http://localhost:5173/dashboard`
    - `https://<your-vercel-project>.vercel.app/dashboard`
5. Save and copy the Client ID and Client Secret.
6. In Supabase Dashboard -> Authentication -> Settings -> External OAuth Providers -> GitHub, paste the Client ID and Client Secret and enable the provider.

### Google OAuth client

1. In Google Cloud Console -> APIs & Services -> Credentials, click Create Credentials -> OAuth client ID.
2. If required, configure the OAuth consent screen first (app name, support email). For testing, 'External' works.
3. Application type: Web application.
4. Name: CareerSync (or similar).
5. Authorized redirect URIs: add both URIs:
    - `http://localhost:5173/dashboard`
    - `https://<your-vercel-project>.vercel.app/dashboard`
6. Save and copy the Client ID and Client Secret.
7. In Supabase Dashboard -> Authentication -> Settings -> External OAuth Providers -> Google, paste the Client ID and Client Secret and enable the provider.

### Supabase redirect URIs & settings

1. In Supabase Dashboard -> Authentication -> Settings -> Redirect URLs, ensure both local and production URIs are listed.
2. In Supabase -> Authentication -> Providers, verify the GitHub and Google providers are enabled and credentials are saved.

### Vercel environment variables

1. In Vercel Project -> Settings -> Environment Variables add:
    - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
2. Redeploy the project (or wait for the GitHub Actions workflow) so the site picks up the env vars.

### Test the flows

1. Local: `cd client && npm run dev` and test Google/GitHub sign-in (ensure `http://localhost:5173/dashboard` is in Supabase redirect URIs).
2. Production: after deployment, test social sign-in on `https://<your-vercel-project>.vercel.app`.

Troubleshooting notes

- "Invalid redirect URI": verify exact scheme, host, and path in the provider console and Supabase. Trailing slashes matter.
- For Google, publish the OAuth consent screen if testing with external accounts.
- If you need server-side sessions, consider implementing a backend to securely exchange codes; current client-side Supabase flows rely on client sessions.


