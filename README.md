# Róvida Portal White-label Frontend

## Project overview
This repository contains the white-label frontend for the Róvida property and community operations portal. It is a Vite-powered React + TypeScript single-page application that layers Tailwind CSS and the shadcn/ui component system on top of React Router routing. The app bootstraps i18next for localization and wraps every screen in a shared `UserProvider` so role-based access checks are available throughout the UI shell.

The experience is organized around a modular AppShell that exposes operational areas such as issues, maintenance, finance, communications, governance, analytics, and deep settings controls. Each module currently renders against a comprehensive mock data layer to keep the UI deployable without a backend, while RBAC utilities enforce view and action guardrails per role.

## Application routes
All routes are defined in `src/App.tsx`. Authentication and onboarding flows live outside the protected shell; everything else is wrapped by `AppShell` so role checks and navigation chrome are consistent. Dynamic route parameters are noted with `:` prefixes.

| Path | Description |
| --- | --- |
| `/auth/login`, `/auth/register`, `/auth/forgot`, `/auth/reset` | Authentication flows rendered within `AuthPage` slots. |
| `/onboarding` | Guided onboarding experience before entering the main shell. |
| `/` | Landing dashboard cards from `Index`. |
| `/dashboard` | Cross-module operational dashboard widgets. |
| `/issues`, `/issues/new`, `/issues/kanban`, `/issues/:id` | Issue list, creation form, Kanban board, and detailed issue timelines. |
| `/emergency` | Emergency center console. |
| `/maintenance`, `/maintenance/calendar`, `/maintenance/assets`, `/maintenance/assets/new`, `/maintenance/work-orders`, `/maintenance/work-orders/:id`, `/maintenance/tasks`, `/maintenance/tasks/:id`, `/maintenance/agenda` | Maintenance overviews, scheduling, asset registry, work orders, technician tasks, and printable agendas. |
| `/finance`, `/finance/bills`, `/finance/bills/:id`, `/finance/payments`, `/finance/purchase-orders`, `/finance/reports`, `/finance/late-fees-nsf`, `/finance/bank-reconciliation` | Finance dashboard, billing, payments, purchasing, reporting, and reconciliation tools. |
| `/board`, `/board/meetings`, `/board/meetings/:id`, `/board/votes`, `/board/votes/:id`, `/board/architectural-requests`, `/board/architectural-requests/new`, `/board/architectural-requests/:id` | Board governance hub with meetings, votes, and ARC workflows. |
| `/rules`, `/rules/catalog`, `/rules/:id`, `/rules/violations`, `/rules/violations/:id` | Community rules catalog and violation enforcement views. |
| `/insurance`, `/insurance/:id` | Insurance portfolio and policy detail. |
| `/amenities` | Amenity scheduling and management. |
| `/tenancy`, `/tenancy/leases`, `/tenancy/statements`, `/tenancy/statements/:id` | Lease oversight and resident financial statements. |
| `/documents`, `/documents/inbox`, `/documents/registry`, `/documents/:id` | Document intake, registry, and reader. |
| `/comms`, `/comms/announcements`, `/comms/announcements/:id`, `/comms/send`, `/comms/templates` | Communications command center, announcement feeds, composer, and templates. |
| `/integrations`, `/integrations/:slug` | Integration marketplace and configuration detail. |
| `/analytics` | Portfolio analytics dashboards. |
| `/automations` | Workflow automation templates. |
| `/settings`, `/settings/org`, `/settings/portfolio`, `/settings/buildings`, `/settings/units`, `/settings/users`, `/settings/roles`, `/settings/security`, `/settings/visitor-logs`, `/settings/notifications`, `/settings/audit`, `/settings/feedback` | Settings layout index plus nested organization, portfolio, property, people, security, visitor logs, notifications, audit trail, and feedback modules. |
| `/profile` | User profile management. |
| `/about` | About page. |
| `/cardnav-demo` | Card navigation demo surface. |
| `*` | 404 catch-all handled by `NotFound`. |

## Role-based access control
Frontend RBAC logic lives in `src/hooks/useAuth.ts`. `PERMISSIONS_MATRIX` maps every supported role to module-level actions (`read`, `create`, `update`, `delete`, `approve`, `export`, `special`), and the `useAuth` hook exposes helper guards (`canRead`, `canCreate`, etc.). Update this matrix whenever a new module or action is added so downstream checks remain accurate.

Seed users, credentials, and tenant scopes are defined in `src/context/UserContext.tsx` under the `MOCK_USERS` array. Adjust role assignments or onboarding defaults there when introducing new personas. The same file owns the `UserProvider` that stores the authenticated user in `localStorage`, which keeps RBAC state persistent across reloads.

When expanding RBAC utilities, prefer adding reusable helpers in `useAuth` (for example `canExport`) so permissions can be audited in one place. Components and pages should only import the hook—not the matrix directly—to keep guardrails centralized.

## Mock data layer
All feature areas consume deterministic mock adapters located in `src/data`. Each file exports strongly typed fixtures that match the table components rendered in the corresponding module (for example `mock-issues.ts`, `mock-bills.ts`, `mock-work-orders.ts`). Update these adapters when you need to stage new datasets, and mirror the production API shapes so the eventual swap is straightforward.

Authentication mocks (emails, passwords, scoped roles) live alongside the user context. UI components reference these fixtures indirectly through hooks and props—resist importing mock files directly inside view components when adding new screens, and instead expose selector functions in the nearest domain adapter for easier replacement later.

### Toggling mocks vs. live APIs
The project expects two environment variables to govern the data source:

- `VITE_USE_MOCK_DATA` (default: `true`): when `true`, continue importing the adapters in `src/data`. When `false`, your data hooks should branch to live API clients instead of the mocks.
- `VITE_API_BASE_URL`: base URL for live requests when mocks are disabled. Leave unset while developing purely against the mock layer.

Because existing modules still import mocks directly, introducing real APIs requires wrapping each domain’s data access in a factory that checks `import.meta.env.VITE_USE_MOCK_DATA`. As you refactor modules, consolidate those factories under `src/data` (for example `src/data/issues.ts`) so the toggle only needs to be handled in one place per domain. Document any new adapters in this README to keep contributors aligned.

To flip the toggle locally, create a `.env` file in the project root:

```bash
# .env
VITE_USE_MOCK_DATA=true
VITE_API_BASE_URL=https://api.your-domain.test
```

Restart Vite after editing `.env` files so the new environment variables load.

## Build and run
Install dependencies and run the development server with your preferred package manager:

```bash
npm install
npm run dev
```

Additional scripts:

- `npm run build` – production build output under `dist/`.
- `npm run build:dev` – development-mode build for verifying bundler output quickly.
- `npm run preview` – serve the built app locally for smoke testing.
- `npm run lint` – ESLint across the entire codebase.

The Vite dev server binds to port 8080 by default (IPv6-compatible) as configured in `vite.config.ts`. Update this file if your environment needs a different port or host binding.

## Acceptance testing and deployment notes
There are no automated end-to-end tests today. Prior to deploying, run `npm run build` and perform manual acceptance checks across the primary dashboards, issue flows, maintenance workflows, and finance tables while logged in as different mock users (for example `platform.owner@example.com` and `tenant@example.com`). This ensures the RBAC helpers are honoring scope differences.

Vercel rewrites every request to `index.html`, so client-side routing will function in production. Remember to replicate any environment variables (`VITE_USE_MOCK_DATA`, `VITE_API_BASE_URL`) in your hosting provider’s dashboard before promoting a build.
