# Welcome to your Dyad app

## Mock data configuration

This project ships with a promise-based mock data layer that can be toggled at build or run time through environment variables. Copy `.env.example` to `.env` and adjust the values to suit your workflow:

- `VITE_USE_MOCKS`: Enables (`true`) or disables (`false`) the mock data adapters entirely.
- `VITE_MOCK_DELAY`: Adds a delay (in milliseconds) to mock responses so you can simulate network latency.
- `VITE_MOCK_DEBUG`: When set to `true`, logs details about mock requests and responses to the console.

When mocks are disabled the `mockAsync` helper resolves immediately, allowing the rest of the application to integrate with real APIs without code changes.
