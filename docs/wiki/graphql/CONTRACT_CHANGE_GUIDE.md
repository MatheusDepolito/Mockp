# GraphQL Contract Change Guide

> Status: Current project state

Use this guide whenever a change affects the GraphQL contract between `apps/api`, `libs/network`, and the frontend apps.

Read with:

- [[DEVELOPMENT_PLAYBOOK]]
- [[../backend/DEVELOPMENT_PLAYBOOK|Backend Development Playbook]]
- [[../features/NEW_FEATURE_FLOW|New Feature Flow]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

Repository example: [[../examples/GRAPHQL_CHANGE_EXAMPLE|GraphQL Change Example]].

## Verified Contract Flow

The current GraphQL contract flow is:

```text
apps/api/src/models/<domain>/graphql/*
  -> apps/api/src/schema.gql
  -> libs/network/src/gql/queries.graphql
  -> libs/network/src/gql/generated.tsx
  -> apps/web* and shared libs consume generated documents/types
```

Verified repository facts:

- Resolvers live in `apps/api/src/models/<domain>/graphql/*.resolver.ts`.
- GraphQL services live in `apps/api/src/models/<domain>/graphql/*.service.ts`.
- GraphQL inputs/args live in `apps/api/src/models/<domain>/graphql/dtos/*`.
- GraphQL entities/outputs live in `apps/api/src/models/<domain>/graphql/entity/*`.
- The generated API schema is stored at `apps/api/src/schema.gql`.
- `GraphQLModule` writes the schema with `autoSchemaFile: join(process.cwd(), 'src/schema.gql')`.
- Frontend GraphQL operations live in `libs/network/src/gql/queries.graphql`.
- Frontend generated GraphQL types/documents are emitted to `libs/network/src/gql/generated.tsx`.
- Codegen config lives at `libs/network/codegen.ts`.
- Codegen script lives in `libs/network/package.json` as `codegen`.

## Codegen Behavior

`libs/network/codegen.ts` currently uses:

- Schema source: `../../apps/api/src/schema.gql`
- Documents: `./src/**/*.graphql`
- Output: `./src/gql/generated.tsx`
- Plugins: `typescript`, `typescript-operations`, `named-operations-object`, `typed-document-node`
- `watch: true`

Run from the repository root:

```powershell
yarn workspace @mockp/network codegen
```

> Needs verification
>
> Because the config has `watch: true`, confirm whether this command exits in the current environment before treating it as a one-shot validation command.

## Add a New Query

1. Find the domain module under `apps/api/src/models/<domain>`.
2. Add service logic in `graphql/<domain>.service.ts` if business logic is required.
3. Add a resolver method in `graphql/<domain>.resolver.ts` with `@Query`.
4. Add or reuse args from `graphql/dtos/*`.
5. Add auth decorators such as `@AllowAuthenticated()` when the existing domain pattern requires it.
6. Run the API so `apps/api/src/schema.gql` reflects the new query.
7. Add the frontend operation to `libs/network/src/gql/queries.graphql`.
8. Run GraphQL codegen.
9. Consume the generated document/type from `libs/network/src/gql/generated.tsx`.
10. Validate backend and affected frontend consumers.

## Add a New Mutation

1. Identify the domain service and mutation pattern.
2. Add or reuse a `Create*Input`, `Update*Input`, or dedicated input in `graphql/dtos/*`.
3. Add service logic before resolver wiring if the mutation has business rules.
4. Add the resolver method with `@Mutation`.
5. Apply auth and row-level checks when the mutation touches protected user/domain data.
6. Regenerate/update `apps/api/src/schema.gql`.
7. Add the mutation document to `libs/network/src/gql/queries.graphql`.
8. Run codegen and update consumers.
9. Validate mutation behavior manually.

## Add or Update Inputs

Inputs and args currently live under:

```text
apps/api/src/models/<domain>/graphql/dtos/*
```

Rules:

- Prefer additive changes for existing inputs.
- Check all `.graphql` operations that pass variables for the input.
- Check forms and UI that build variables.
- Avoid changing required fields without confirming frontend consumers and business rules.

## Add or Update Outputs and Entities

Entities currently live under:

```text
apps/api/src/models/<domain>/graphql/entity/*
```

Rules:

- Add fields only when the backend can resolve them safely.
- Use resolver fields when existing patterns do.
- Check for nested relation cost and possible N+1 behavior.
- Update frontend operations only with fields the UI actually needs.

## Update Frontend Operations

Frontend operation source:

```text
libs/network/src/gql/queries.graphql
```

After editing operations:

- Run codegen.
- Update generated document imports if operation names changed.
- Search for the old operation or generated document name.
- Validate the affected app and shared UI consumers.

Do not edit `libs/network/src/gql/generated.tsx` manually.

## Avoid Breaking Consumers

Before removing, renaming, or changing meaning:

- Search `libs/network/src/gql/queries.graphql`.
- Search generated document/type names in frontend apps and shared libs.
- Check `libs/forms` for variable-building code.
- Check `libs/ui` for data access.
- Check all affected app routes from [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]].

Prefer:

1. Add the new field/operation.
2. Migrate consumers.
3. Validate.
4. Remove the old field in a later reviewed change.

## Validation Updates

Update [[../operations/VALIDATION_CHECKLIST|Validation Checklist]] when:

- A new codegen command or behavior is introduced.
- Codegen becomes one-shot instead of watch-based.
- Generated output paths change.
- GraphQL validation requires an additional app-specific command.

## Stop and Ask for Review

Stop before:

- Removing or renaming fields, queries, mutations, args, or object types.
- Changing field nullability or meaning.
- Changing auth behavior on a resolver.
- Adding nested relation fields with performance risk.
- Changing schema generation location.
- Editing generated GraphQL output manually.
- Making a contract change without checking frontend consumers.

See [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Future Recommendation

> Status: Future recommendation

- Consider splitting `queries.graphql` into domain-specific files if it becomes too large.
- Consider making codegen one-shot for CI validation while keeping a separate watch command for local development.
- Consider adding fragments for repeated field selections when frontend duplication grows.

