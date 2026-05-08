# i18n Guide

> Status: Not implemented

Project-wide i18n is not confirmed as a standard. This guide documents the current internationalization state. Do not introduce i18n frameworks or locale behavior without an architectural decision.

Read with:

- [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]]
- [[../features/NEW_FEATURE_FLOW|New Feature Flow]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Current State

No confirmed project-wide i18n standard was verified.

No usage was verified for common i18n libraries or patterns such as:

- `next-intl`
- `react-i18next`
- `i18next`
- `useTranslation`
- locale route folders
- message catalogs
- translation JSON dictionaries

Frontend layouts currently use:

```tsx
<html lang="en">
```

Visible UI strings are currently hardcoded in components, routes, layouts, and shared UI.

## What Agents Must Not Assume

- Do not assume English is the final product language standard.
- Do not assume Portuguese or English copy should be translated automatically.
- Do not introduce locale routing without a decision.
- Do not add message catalogs ad hoc.
- Do not wrap isolated strings in a new translation helper unless i18n has been approved.
- Do not mix copy cleanup with i18n architecture.

## Stop Condition

If a feature requires multi-language behavior, stop and ask for an architectural decision before implementation.

Examples:

- User-selectable language.
- Locale-specific routes.
- Translated validation messages.
- Translated emails or notifications.
- Currency/date/number localization beyond local formatting needs.

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
