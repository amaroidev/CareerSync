# PATHFINDER — Copilot Rules and Engineering Playbook

Authoritative rules for AI coding assistants and contributors. Treat this file as binding unless a maintainer explicitly overrides it in writing.

## Vision

Build a unified platform for scholarship and job discovery, application tracking, and career development with an AI-first, API-first architecture and global reach.

## Non‑negotiable rules (priority order)

1) Security and privacy by default: no secrets in code; least privilege access; encrypt data at rest and in transit; comply with GDPR/CCPA where applicable.
2) Reliability: graceful error handling, idempotent critical operations, and observability on all public endpoints.
3) API-first: everything important is a documented API; clients consume APIs; keep backward compatibility or version.
4) Quality: typesafe code, lint+format clean, unit/integration tests for new features, and docs for any public surface.
5) Explainable, fair AI: avoid protected-class bias; make recommendations traceable and user-controllable.
6) Minimal dependencies: prefer stdlib and established libraries already in the stack; justify any new dep.
7) Human-in-the-loop: AI-generated code is reviewed before merge; no auto-deploy of unreviewed changes.

## Scope and phases (context)

- Phase 1 (MVP): Core features + User Profile & Personalization + Basic Application Tracking.
- Phase 2: Productivity tools + Community + Basic analytics.
- Phase 3: Advanced AI + Interview prep + Financial planning.
- Phase 4: Enterprise + Globalization + Advanced integrations.

## Tech stack baseline

- Web: React + TypeScript; state via Redux Toolkit; UI via MUI + Tailwind; PWA-capable.
- Mobile: React Native with EXPO GO(iOS/Android); FCM for push; native modules for OCR.
- Backend APIs: Node.js + Express (TypeScript); GraphQL (Apollo Server) where beneficial; OpenAPI/Swagger.
- Data: PostgreSQL (relational), MongoDB (unstructured docs/notes), Redis (cache/session), Elasticsearch (search).
- AI/ML: Python, TensorFlow/PyTorch, HF Transformers; SageMaker for deployment; Airflow/Kafka/Spark for pipelines.
- Cloud/Infra: AWS (EC2/RDS/S3/Lambda/CloudFront/Cognito), Docker, Kubernetes, Terraform; GitHub Actions CI; ArgoCD CD.
- Observability/Security: Prometheus/Grafana, ELK, Sentry/New Relic; SonarQube, OWASP ZAP; Vault for secrets; AWS WAF.

## Architecture and boundaries

- Separate bounded contexts: Identity, Profiles, Opportunities (jobs/scholarships), Matching, Applications, Documents, Analytics.
- Allowed dependency directions: UI -> API Gateway -> Services -> Data stores. No lateral service coupling without an interface contract.
- Public contracts: define with OpenAPI/GraphQL SDL; version as /v1, /v2; never break without deprecation path.
- Data normalization: maintain universal taxonomy for titles, skills, academic fields, locations.

## Security & privacy

- Secrets: environment variables + Vault. Never commit keys/tokens. CI scans for secrets.
- PII: classify and minimize. Store documents in S3 with server-side encryption and tight IAM. Use presigned URLs for uploads/downloads.
- AuthN/Z: Cognito (or equivalent). Use JWT/OAuth2. Enforce RBAC/ABAC per resource. Multi-factor authentication supported. See `docs/security/AUTHENTICATION.md` for full spec.
- Compliance: log consent, enable data export/delete on request. Default to privacy by design.
- Input handling: validate, sanitize, and encode. Block common injection, XSS, CSRF. Rate-limit public endpoints.

## AI development rules

- Fairness: exclude protected attributes from features; monitor disparate impact; allow user overrides.
- Explainability: attach “matched because …” factors and weights to recommendations.
- Data: anonymize for training; respect opt-in/opt-out; retain only necessary fields.
- Quality gates: A/B test model changes; track success metrics (application→interview/offer lift); human moderation on sensitive outputs.

## Performance & scalability

- Design for async where heavy (OCR, ML scoring) via queues.
- Cache: Redis for hot reads and recommendation caches. Invalidate on profile/taxonomy changes.
- Pagination required on all list endpoints. Avoid N+1 queries; use indexes and projections.
- Establish SLOs per endpoint and monitor p95 latency and error rate dashboards.

## Code style and conventions

- TypeScript strict mode on. Prefer functional, pure helpers; avoid shared mutable state.
- Formatting: Prettier; Linting: ESLint (recommended + security rules). Commit only formatted, lint-clean code.
- Errors: never swallow; return typed errors with safe messages; log structured context (correlation IDs).
- Logging: no PII in logs; use levels appropriately; include request IDs.
- Naming: consistent, descriptive names; HTTP paths kebab-case; GraphQL types PascalCase; DB tables snake_case.

## Testing policy

- Pyramid: unit (majority), integration (service+DB), and targeted E2E for critical flows.
- Every public endpoint: happy path + auth failure + validation error test cases.
- Deterministic tests; avoid external calls—use test containers/mocks.
- Coverage: add/maintain tests alongside features; critical modules should have high coverage.

## CI/CD rules

- CI must run: type-check, lint, unit/integration tests, security scan (SAST/deps), and build.
- No direct commits to main; use short-lived PRs; require at least one review.
- CD uses GitOps (ArgoCD); blue/green or canary for risky changes; auto-rollback on health regression.

## Documentation

- Keep READMEs per package/service up to date with run/test instructions.
- Maintain ADRs for significant decisions (docs/adr/0001-… md). Reference related tickets/metrics.
- Public APIs documented via OpenAPI/GraphQL SDL, generated docs published with the service.

## Prompting rules for Copilot (how to work with this file)

- Treat this file as authoritative context. If a requirement conflicts, list options with trade‑offs and ask one clarifying question only if truly blocked.
- Default to secure, typesafe, test-first implementations. Generate tests with any new public behavior.
- Minimize dependencies; explain any addition briefly.
- When editing code, reference file paths and keep diffs minimal; preserve existing style.

## How to bind these rules in a chat session

Paste this at the start of a session with your AI assistant:
“Use docs/COPILOT_RULES.md as binding constraints for this session. The project overview is in docs/‘Pathfinder App - Complete Feature List & Developme 258aeb275c2d807a9598e0acfa7c9dc8.md’. Follow Testing, Security, and AI rules when implementing.”

## Ready-to-use checklists

 PR checklist (must pass to merge):

- [ ] Linked issue and short description of change
- [ ] OpenAPI/SDL updated (if API changed)
- [ ] Unit/integration tests added/updated and passing
- [ ] Lint/format/type-check clean; no secrets introduced
- [ ] Observability: logs/metrics/traces added for new critical paths
- [ ] Security review completed for authZ, PII, and inputs

 Design/ADR checklist:

- [ ] Problem statement and constraints
- [ ] Options considered with trade-offs
- [ ] Decision and rationale, rollout/rollback plan
- [ ] Impact on security, privacy, performance, and cost

## References to source context

- Full feature and strategy overview: docs/PATHFINDER OVERVIEW.md

## Domain glossary (starter)

- Opportunity: A job or scholarship listing normalized into a common schema.
- Application: A user’s tracked submission to an opportunity with status, tasks, notes, and documents.
- Matching score: Explainable score produced by the AI matcher indicating relevance.

---

 Change log

- 2025-08-23: Initial rules authored from the Pathfinder overview.

