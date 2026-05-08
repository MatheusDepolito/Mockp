# Future Typed REST OpenAPI

> Status: Future recommendation

Not implemented in the current project.

This guide describes a possible future direction for typed REST contracts. Do not implement it unless explicitly requested.

Read with:

- [[REAL_REST_PATTERNS]]
- [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Why Typed REST May Be Useful

Typed REST may help when REST endpoints become a real frontend contract for:

- Provider integrations.
- Webhooks/callback flows.
- File uploads.
- Redirect-based flows.
- Public HTTP endpoints consumed outside GraphQL.

The goal would be similar to the existing GraphQL flow: backend contract first, generated frontend types, and no manual duplication.

## Suggested Direction

Use NestJS Swagger/OpenAPI as the contract source:

```text
NestJS controller + DTOs + Swagger decorators
  -> OpenAPI document
  -> generated TypeScript types/client
  -> frontend REST helper/client
```

This would align REST with the existing GraphQL codegen principle:

```text
Backend contract
  -> generated TypeScript contract
  -> frontend consumption through shared package
```

## Possible Tooling

> Needs verification

Potential options to evaluate later:

- `openapi-typescript` for type generation.
- `openapi-fetch` or a small local typed fetch wrapper.
- A generated `libs/network/src/rest/generated/*` output path.
- A committed OpenAPI JSON file or a generation command that fetches it from a running API.

No option is implemented today.

## Prerequisites

Before implementation:

- Stabilize the real REST endpoint patterns.
- Decide which REST endpoints are frontend contracts.
- Ensure DTOs are accurate and decorated enough for Swagger.
- Decide whether OpenAPI generation runs from source or a running server.
- Decide generated output paths.
- Decide CI validation behavior.
- Update [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].

## Risks

- Duplicating GraphQL with REST for the same app-screen data.
- Treating incomplete Swagger metadata as a reliable contract.
- Generating types for endpoints that are not intended for frontend use.
- Adding another generated-contract flow without CI validation.
- Exposing server-only fields through REST DTOs.
- Confusing future recommendation with current project state.

## Migration Plan If Chosen Later

1. Audit current REST controllers with [[REAL_REST_PATTERNS]].
2. Select one low-risk endpoint that is already consumed by the frontend.
3. Improve Swagger DTO metadata only where needed.
4. Add an OpenAPI generation command.
5. Add generated REST types under `libs/network`.
6. Add a typed REST helper that uses `NEXT_PUBLIC_API_URL`.
7. Update frontend caller for the selected endpoint.
8. Add validation commands to [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].
9. Document the new standard before expanding to more endpoints.

## Stop Conditions

Stop before:

- Implementing OpenAPI generation.
- Adding generated REST clients.
- Replacing GraphQL app-screen contracts with REST.
- Exposing new REST endpoints publicly without auth review.
- Adding new env vars without updating [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]].

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].
