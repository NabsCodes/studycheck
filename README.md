# StudyCheck

README prose word count: 891 (headings and body; code blocks, link destinations and this line excluded).

**Author: Hassan Umar Hassan** · MSc Intelligent Interactive Systems · University of Birmingham

StudyCheck explores how students check AI study advice against course material while keeping control of their own answer. It develops the interaction proposed in A1, _Uncertainty Messages and Students' Verification of AI Study Answers_, into an inspectable A2 prototype.

![StudyCheck session setup, developer screenshot from 19 November 2026](docs/images/session-setup.jpg)

## What works now

Task 01 is a complete local interaction: choose a reminder condition, answer independently, inspect advice, optionally consult lecture notes, submit a final answer and review the recorded actions. General and claim-specific conditions share the same question, advice, notes and controls; only warning wording changes. The condition stays locked during a session, and the initial answer is preserved.

AI advice and claim flagging are fixed, authored simulations. There is no live model, retrieval pipeline or automatic error detector. The application handles the actual interaction and records; it does not estimate what a student knows.

Correct-advice and misleading-warning examples, the assessment diagram, illustrated storyboards and report remain unfinished. No participant study has been conducted. The repository has not been published, and no final submission commit or release has been designated. An online deployment is not needed to inspect this version.

## Run locally

Requires Node.js 22.13 or newer and pnpm 10.2.0. Download or clone the repository, then open a terminal in its root folder. If pnpm is missing, install it with `npm install --global pnpm@10.2.0`.

```bash
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1
```

Open the local URL printed in the terminal, normally <http://127.0.0.1:3000>. If that port is occupied, follow the printed URL. Stop the server with Ctrl+C. For a production preview:

```bash
pnpm build
pnpm start --hostname 127.0.0.1
```

No API keys, environment file or service account are required. Internet access is needed to install dependencies and fetch Geist through `next/font/google` during compilation. The browser receives the font from this app. The original lecture link requires university access; the adapted notes are available locally.

## Try Task 01

1. Select **General reminder** and start the session.
2. Select **Yes**, then save the initial answer. The simulated advice appears and recommends Yes.
3. Open the lecture notes. Compare the claim with the notes, then select **No** and submit.
4. Check that the review preserves Yes as the initial answer, shows No as the final answer and records notes access. Expand **See the recorded actions** to inspect the sequence.
5. Restart, select **Claim-specific message**, choose **Not sure** and continue. Submit without opening notes. The review should preserve Not sure and show no notes access.

Submitting without an initial choice displays an error. Final selection initially matches the first answer and requires explicit submission. Restart or refresh clears the session. Replaying a revealed question demonstrates behaviour; it is not an independent experimental comparison.

## How it is organised

Next.js App Router provides the page and font/icon assets. React manages the interaction; TypeScript describes valid stages, answers and events. Tailwind styles the interface. Native radios and buttons provide the controls. pnpm pins dependencies; Vitest checks transition rules.

- [`app/page.tsx`](app/page.tsx) composes the client study feature.
- [`components/study/`](components/study/) presents setup, answers, notes and review.
- [`content/scenarios.ts`](content/scenarios.ts) holds the versioned question, advice, warnings, notes and answer key.
- [`hooks/use-study-session.ts`](hooks/use-study-session.ts) connects actions and post-render presentation events to the reducer.
- [`lib/study-session.ts`](lib/study-session.ts) guards transitions and preserves factual records; [`types/study.ts`](types/study.ts) defines the state shapes.
- [`tests/study-session.test.ts`](tests/study-session.test.ts) checks preservation, condition locking, optional notes, duplicate/stale events and restart isolation.

The review uses state and events, rather than generated judgements. Records include condition, task/content versions, initial and final answers, and elapsed action times. They stay in browser memory; there is no database, analytics, persistence or export. Notes access does not establish reading or understanding, and answer changes do not establish learning or the warning's effectiveness.

## Checks and development evidence

Formatting, ESLint, types, seven tests and the production build passed on 19 November 2026. Browser walkthroughs recorded in the development log cover both conditions, validation, keyboard/focus behaviour, notes, review and reset. Narrow-screen checks included 390 and 320 pixels. These are developer checks, not participant findings or complete accessibility certification.

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The [development record](docs/development-record.md) explains significant changes, reasons, failures and checks. Existing history includes `13fb206` for the first complete task, `ffd4525` for identity/interface refinement, and `fd7d9bc` for font/editor refinements. These are development milestones, not a designated submission version.

ESLint and Prettier are the project tools. Workspace settings disable the Biome editor extension; `biome.json` retains Tailwind parser support for other callers. If an old CSS diagnostic remains, reload the editor window. The icon source is [`app/icon.svg`](app/icon.svg); `pnpm icons` regenerates its raster exports.

## Sources, authorship and AI assistance

Hassan selected the topic and approved the flow and local project location. Codex assisted with source review, task wording, wireframing, scaffolding, implementation, debugging, documentation and checks. For example, the original focus effect was replaced with a keyed heading/callback ref while preserving stage focus. Hassan rejected the package-based font approach; it was replaced with Geist through standard Next.js font loading. The development record distinguishes requested decisions, adaptations and actual verification; no full prompt log is included.

Task 01's notes paraphrase `W04_L11_Retrieval_Grounding_and_Provenance.pdf`, PDF pages 5, 8 and 10. [Task notes](docs/task-01.md) explain the evidence and methodological limits, with a link to the original lecture. The PDF is not redistributed.

Hassan's Dikko & Mahmoud, Party Gift Pass, Vextra and WardWise projects informed organisation, stage handling, feedback and progress. Their business code and assets were not copied. The source-page icon was created for StudyCheck with Codex assistance. The setup image above is a developer screenshot, not participant evidence.
