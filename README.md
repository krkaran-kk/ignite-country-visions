# Ignite Localize

We have one website, "https://joinignite.com/," which is currently global; now the owner wants to create one for kazakhstan and Russia version.
in which the content and product will be almost same just we have to play with design as client want that something unique and different.
what you have to do for now is only make the home page frontend with prototyping.
the website should show some local elements of the country so that there users can relate to that. (analyze both country websites first).
Check the attached image.
We will only give an option in the header to switch language; for now, you don't have to make that functionality just show the options.
Make the home page more nicely animated. client loves prototyping sections

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ignite-country-visions.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/39a588d2-1345-4053-a3c6-52565f434e60).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Use **Node.js 22.22+ (22.x) or 24+**. The system Node 20.9.0 on this machine is too old for this toolchain. `.nvmrc` pins the version used for local setup. No `.env` file, database or Lovable login is required to run the existing prototype.

On this Windows checkout, an isolated Node runtime is available under the ignored `.local/` directory. Start the site from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local.ps1
```

Open **http://127.0.0.1:3000/**. Keep the terminal running; press Ctrl+C to stop. The launcher uses the project-local Node executable when present and does not change the system installation. If port 3000 is already in use, it reports an error instead of silently selecting another port.

For a fresh checkout, install a supported Node version and Bun, then use the committed lockfile:

```sh
bun install --frozen-lockfile
npm run dev -- --host 127.0.0.1 --port 3000 --strictPort
```

`bun.lock` remains the dependency source of truth used by Lovable. Do not mix package-manager lockfiles. The `.local/` runtime and caches are machine-local and are not committed.

Checks on this Windows checkout:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local.ps1 typecheck
powershell -ExecutionPolicy Bypass -File .\start-local.ps1 lint
powershell -ExecutionPolicy Bypass -File .\start-local.ps1 build
```

With a supported Node version on PATH, the equivalent commands are `npm run typecheck`, `npm run lint`, and `npm run build`. Vite generates the route tree; do not edit `src/routeTree.gen.ts` manually. Keep Lovable's existing build configuration for deployment.

See [PROJECT-STATUS.md](./PROJECT-STATUS.md) for the architecture review, prototype limitations and gaps against the supplied design guide.
