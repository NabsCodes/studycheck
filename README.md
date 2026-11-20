# StudyCheck

README prose word count: 1114 (headings and body; code blocks, link destinations and this line excluded).

**Author: Hassan Umar Hassan** · MSc Intelligent Interactive Systems · University of Birmingham

StudyCheck explores how students check AI study advice against course material while keeping control of their own answer. It develops the interaction proposed in A1, _Uncertainty Messages and Students' Verification of AI Study Answers_, into an inspectable A2 prototype.

![StudyCheck session setup, developer screenshot from 19 November 2026](docs/images/session-setup.jpg)

## What works now

Three fixed variants of the same citation-support question run locally: Task 01 has incorrect advice, Task 02 has correct advice without a targeted flag, and Task 03 can flag a correct claim. Each uses the same interaction: choose a reminder condition, answer independently, inspect advice, optionally consult lecture notes, submit a final answer and review the recorded actions. Within each example, general and claim-specific conditions share the same question, advice, notes and controls; only active warning wording changes. Task 02 uses the same general reminder in both styles because it has no targeted flag. The condition stays locked during a session, and the initial answer is preserved.

AI advice and claim flagging are fixed, authored simulations. There is no live model, retrieval pipeline or automatic error detector. The application handles the actual interaction and records; it does not estimate what a student knows.

Hassan confirmed Task 01 was already verified. The assessment diagram, illustrated storyboards and report remain unfinished. No participant study has been conducted. The repository has not been published, and no final submission commit or release has been designated. An online deployment is not needed to inspect this version.

The [submission checklist](docs/submission-checklist.md) maps the remaining work to the rubric and revised deadline. Open the [HTML roadmap](docs/submission-roadmap.html) in a browser for the side-by-side comparison and timeline.

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

## Try the examples

1. Select **Task 01** and **General reminder**, then start the session.
2. Select **Yes**, then save the initial answer. The simulated advice appears and recommends Yes.
3. Open the lecture notes. Compare the claim with the notes, then select **No** and submit.
4. Check that the review preserves Yes as the initial answer, shows No as the final answer and records notes access. Expand **See the recorded actions** to inspect the sequence.
5. Restart, choose **Task 02** and either style, then start. The advice recommends No and the review identifies a supported claim. This baseline has the same general reminder in both styles.
6. Restart, choose **Task 03** and **Claim-specific message**. Start, choose No and save it; compare the warning with the optional notes, then submit. The review identifies a simulated false alarm even when you keep the correct No. The [developer review screenshot](docs/images/false-alarm-review.jpg) shows that path.
7. Not sure remains available in every example. Submitting it without notes should preserve that response and record no note access.

Submitting without an initial choice displays an error. Final selection initially matches the first answer and requires explicit submission. Restart or refresh clears the session. Changing the example also resets the reminder style to general. Replaying a revealed question demonstrates behaviour; it is not an independent experimental comparison.

## How it is organised

Next.js App Router provides the page and font/icon assets. React manages the interaction; TypeScript describes valid stages, answers and events. Tailwind styles the interface. Native radios and buttons provide the controls. pnpm pins dependencies; Vitest checks transition rules.

- [`app/page.tsx`](app/page.tsx) composes [`study-workspace.tsx`](components/study/study-workspace.tsx), whose keyed session isolates example state.
- [`components/study/`](components/study/) presents setup, answers, notes and review.
- [`content/scenarios.ts`](content/scenarios.ts) holds the versioned examples, advice, authored flags, warnings, notes and answer keys.
- [`hooks/use-study-session.ts`](hooks/use-study-session.ts) connects actions and post-render presentation events to the reducer.
- [`lib/study-session.ts`](lib/study-session.ts) guards transitions and preserves factual records; [`lib/advice-review.ts`](lib/advice-review.ts) distinguishes incorrect advice, supported advice and a displayed false alarm; [`types/study.ts`](types/study.ts) defines the state shapes.
- [`tests/study-session.test.ts`](tests/study-session.test.ts) checks preservation, condition locking, optional notes, duplicate/stale events and restart isolation.

The review uses state and events, rather than generated judgements. Records include condition, task/content versions, initial and final answers, and elapsed action times. They stay in browser memory; there is no database, analytics, persistence or export. Notes access does not establish reading or understanding, and answer changes do not establish learning or the warning's effectiveness.

## Checks and development evidence

Formatting, ESLint, types, ten tests and the production build passed on 19 November 2026. One transition test covers 108 combinations across three examples, two conditions, three initial/final choices and optional notes. Additional checks distinguish the baseline from a false alarm and prevent cross-example records. Browser walkthroughs recorded in the development log cover all three examples under both conditions, validation, keyboard/focus behaviour, notes, review and reset. Narrow-screen checks included 390 and 320 pixels. These are developer checks, not participant findings or complete accessibility certification.

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

Task 01's notes paraphrase `W04_L11_Retrieval_Grounding_and_Provenance.pdf`, PDF pages 5, 8 and 10. [Task notes](docs/task-01.md) explain the evidence and methodological limits, with a link to the original lecture. [Tasks 02–03 notes](docs/task-02-03.md) explain the correct-advice baseline and false-alarm variant. The PDF is not redistributed.

Hassan's Dikko & Mahmoud, Party Gift Pass, Vextra and WardWise projects informed organisation, stage handling, feedback and progress. Their business code and assets were not copied. The source-page icon was created for StudyCheck with Codex assistance. The setup image above is a developer screenshot, not participant evidence.
