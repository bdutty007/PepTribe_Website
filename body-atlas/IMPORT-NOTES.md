# Body Atlas source import

Imported from `peptribe-body-atlas (2).zip` on October 26, 2026 into the existing PepTribe_Website repository, branch `add-body-atlas`. The archive's single wrapper directory was mapped to `body-atlas/`; all internal paths were preserved.

## Verification

- All 100 exported files other than `.gitignore` were verified byte-for-byte against the ZIP using SHA-256.
- The exported `.gitignore` was extended to exclude environment files, coverage, and TypeScript build metadata. Existing dependency and build-output exclusions were retained.
- Source scan found no obvious private keys, provider access tokens, or credential assignments. No environment files were present in the export. Public CDN links and chat widget identifiers were retained.
- No existing website files were changed. No deployment, DNS, or live application changes were made.

## Dependency installation and production build

Environment: Windows, Node.js v24.22.1, Bun v1.4.4.

Run from this directory:

```powershell
bun install --frozen-lockfile --ignore-scripts
node node_modules/vite/bin/vite.js build
```

Installation succeeded with the supplied `bun.lock` unchanged. Normal installation failed in the exported `canvas` dependency's native setup because Visual Studio C++ build tools are unavailable. Lifecycle scripts were skipped for verification; the application source does not import canvas. No dependencies were removed or changed. Bun's Windows script launcher also failed locally, so the production Vite command was invoked through Node directly.

Production build: PASS, Vite 5.4.21, 1600 modules transformed, completed in 8.51 seconds. Output: dist/index.html (5.99 kB), CSS (86.25 kB), JS (344.51 kB). Build output and node_modules are excluded from Git.

This confirms production compilation, not a full interactive or live-service test. Native canvas functionality was not verified in this environment.
