# CI and Nx Cloud

> Status: Current project state

This guide documents what can and cannot be assumed about CI and Nx Cloud from the repository.

Read with:

- [[NX_COMMANDS]]
- [[VALIDATION_CHECKLIST]]
- [[../testing/TEST_STRATEGY|Test Strategy]]
- [[PRE_COMMIT_CHECKLIST]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified CI Reality

Repository verification found no CI configuration files for:

- GitHub Actions workflows.
- GitLab CI.
- Docker-based CI.
- Vercel project config.
- Serverless deployment config.

> Needs verification
>
> CI may exist outside the repository or in platform settings, but it is not visible in the current repo.

## Verified Nx Cloud State

`nx.json` contains:

```json
"nxCloudId": "6798ddf4d4f9b972b4c4932e"
```

This means Nx Cloud is configured at the Nx config level.

Do not assume:

- Which tasks are run remotely.
- Which branch policies exist.
- Which checks block merges.
- Whether affected commands are used in CI.
- Whether CI uploads artifacts.

## Nx Behavior

Verified `nx.json` target defaults:

- `build` depends on `^build`, has outputs, and is cacheable.
- `lint` depends on `^lint` and is cacheable.
- `tsc` depends on `^tsc` and is cacheable.
- `defaultBase` is `main`.

Use [[NX_COMMANDS]] for command details.

## Commands Agents Can Trust Locally

Verified root commands:

```powershell
yarn tsc
yarn lint
yarn build
yarn format:check
```

Verified full validation command:

```powershell
yarn validate
```

Important: `yarn validate` runs `format:write`, so it can modify files.

## Commands That Are Uncertain

> Needs verification

Affected commands are plausible because `defaultBase` is configured, but current behavior was not verified:

```powershell
yarn nx affected -t lint
yarn nx affected -t tsc
yarn nx affected -t build
```

Do not use affected commands as the only validation until verified.

## What Not To Assume

- Do not assume CI exists.
- Do not assume CI runs tests.
- Do not assume Nx Cloud success means all required checks passed.
- Do not assume deployment happens from CI.
- Do not assume migrations run automatically in CI or release.
- Do not assume `yarn validate` is safe when formatting changes are not acceptable.

## Future Recommendation

> Status: Future recommendation

If CI is added later, document:

- Trigger branches.
- Required checks.
- Nx affected strategy.
- Cache/Nx Cloud behavior.
- Test strategy.
- Build matrix for API and web apps.
- Prisma migration validation.
- GraphQL codegen validation.
- Deployment gates.
