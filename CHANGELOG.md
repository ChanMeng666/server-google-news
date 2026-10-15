# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-10-15

### Fixed
- The published 1.0.0 package was built from an early commit that carried a fixed SerpAPI key and ignored `SERP_API_KEY`. That key is revoked, so 1.0.0 cannot search. 1.0.1 is built from the current source: it reads your own `SERP_API_KEY` and stops with a clear message when it is missing.
- Build: `tsconfig.json` names the Node types, which TypeScript 6 no longer includes by default.

### Changed
- `mcp-evals` moved to `devDependencies`: it is only used by the eval suite, so `npx` installs no longer pull it in.

### Added
- Standard community-health documentation (`CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `GOVERNANCE.md`, this changelog).

## [1.0.0]

### Added
- Initial documented release of Server Google News.
