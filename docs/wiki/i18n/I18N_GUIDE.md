# i18n Guide

> Status: Baseline in progress (`pt-BR` + `en-US`)

Project-wide i18n is not confirmed as a standard. This guide documents the current internationalization state. Do not introduce i18n frameworks or locale behavior without an architectural decision.

Read with:

- [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]]
- [[../features/NEW_FEATURE_FLOW|New Feature Flow]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Current State

Project-wide i18n is being introduced with a lightweight shared layer:

- Locales: `pt-BR` (default) and `en-US`
- Locale source (MVP): `lang` query or `locale` cookie, with fallback to `pt-BR`
- Shared frontend i18n utilities in `libs/util/i18n/`
- GraphQL API errors now expose stable `code` + fallback `message` (hybrid strategy)
- Enum/status values remain technical English keys in Prisma/GraphQL; UI shows localized labels

## Current Rules

- Do not introduce locale routing without a decision.
- Do not change enum values in Prisma/GraphQL for translation purposes.
- Do not remove fallback behavior (`pt-BR` default, API fallback message).

## Stop Condition

If a feature requires locale routing or more than `pt-BR`/`en-US`, stop and ask for an architectural decision before implementation.

Examples:

- Locale-specific routes.
- Translated emails or notifications.
- Currency/date/number localization beyond local formatting needs.

## Implemented Baseline Checklist

- [x] Shared locale, provider, and message catalog foundation
- [x] Layouts reading locale and setting `<html lang>`
- [x] Enum/status label mapping in key UI surfaces
- [x] Backend error codes for critical auth/agent flows
- [x] Frontend error translation by `code` with fallback
- [ ] Complete migration of hardcoded copy in all apps/components
- [ ] Locale switcher component in header/profile
- [ ] Automated test suite for i18n mapping and fallbacks

## Future Recommendation

> Status: Future recommendation

If i18n becomes required, decide:

- Supported locales.
- Routing strategy.
- Translation library.
- Message catalog location.
- Shared UI translation boundaries.
- Backend error/message localization policy.
- Validation message localization.
- Date/currency formatting rules.
- Testing and fallback behavior.

Document the chosen standard before converting hardcoded text.

## Needs Verification

> Needs verification

- Product language requirements.
- Whether all apps should support the same locales.
- Whether backend error messages need localization.
- Whether existing hardcoded text should be normalized before adopting i18n.
