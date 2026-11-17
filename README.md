# StudyCheck

README prose word count: 525 (headings and body; code blocks, link destinations and this line excluded).

StudyCheck is an IIS coursework interaction prototype based on Nabeel's A1 problem and proposed comparison. Task 01 asks whether a working citation establishes support. A student answers, sees fixed simulated AI advice and a reminder, optionally opens lecture notes, and submits a final answer.

## Current status

Task 01 works locally with both general and claim-specific reminder conditions. The student can commit an initial answer, view fixed advice, optionally consult notes, submit a final choice and inspect the factual review. The advice and claim flag are hand-authored simulations, not a live model or error detector. No user study has been conducted. Nabeel's first application walkthrough is pending.

Accounts, databases, analytics, uploads, persistence and other tasks are outside this milestone. Refresh or restart discards the current session. The original lecture link requires university access; the adapted notes work locally.

## Run

Use Node.js 22.13 or newer and pnpm 10.2.0. The current development machine uses Node 26.8.2.

```bash
pnpm install
pnpm dev
```

Open <http://127.0.0.1:3100>. No service credentials are needed. To run a production build locally:

```bash
pnpm build
pnpm start
```

## Try the interaction

Choose a reminder style, start, select Yes, and save the initial answer. Open the notes, choose No and submit. The review should preserve the initial Yes and show note access. Restart to try Not sure with the other reminder, then submit without opening notes. These are walkthrough instructions, not experimental results.

## Main files

- `app/page.tsx` composes the study feature; `app/layout.tsx` and `app/globals.css` define metadata and the visual foundations.
- `content/scenarios.ts` holds the exact question, advice, both reminders, notes, expected answer and source provenance.
- `hooks/use-study-session.ts` connects browser actions and post-render presentation events to React state.
- `lib/study-session.ts` defines pure transitions, guards and factual event helpers.
- `types/study.ts` describes allowed stages, answers and events.
- `components/study/` presents the screens; `components/ui/button.tsx` is the shared button.
- `tests/study-session.test.ts` checks answer preservation, condition locking, optional note access, duplicate actions and reset isolation.

## Stack and checks

Next.js App Router provides the page; React manages interaction; TypeScript describes data and state; Tailwind styles the controls. Native HTML controls provide keyboard interaction. pnpm maintains one lockfile. Vitest checks transition rules.

Formatting, lint, types, seven tests and a production build passed on 17 November 2026. Browser checks covered both conditions, empty-answer validation, keyboard operation, notes opening/closing/reopening, retaining Not sure without notes, answer preservation, review records, restart and refresh. Layouts at 390 and 320 pixels had no horizontal overflow. These are developer walkthroughs, not participant findings or a complete accessibility audit.

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Development record and AI assistance

The [development record](docs/development-record.md) connects changes with decisions and actual checks. [Task notes](docs/task-01.md) explain provenance, simulation boundaries and limitations. Nabeel selected the task and approved the wireframe and local project location. Codex assisted with source review, planning, the wireframe, scaffolding, implementation and checks. This milestone adapts the approved content and wireframe; corrections and rejected suggestions are recorded as they occur. No full prompt log is included.

The structure draws on read-only reviews of Nabeel's existing projects, especially Dikko & Mahmoud, Party Gift Pass, Vextra and WardWise. Their business workflows and integrations are not copied. The short course notes are an attributed paraphrase; the lecture PDF is not redistributed here. This repository has not been published. Diagram, storyboard and report preparation follow Nabeel trying this first interaction.
