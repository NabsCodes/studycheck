# Development record

I designed the frontend layout and used my A1 review to decide what the interaction should show. I reviewed the flow, asked for changes and confirmed Task 01. OpenAI Codex generated code and tests, drafted documentation, and produced the diagram and walkthroughs. Codex ran the developer checks recorded below.

## Student decisions and checks

### 17 November · Start with one complete example

I approved the wireframe and asked to build Task 01 first, from the student's initial answer through to the review. I wanted to try that whole interaction before adding more examples.

The first build kept the question, advice, notes and controls the same under both reminders. It saved the initial answer before showing advice and let the student decide whether to open the notes. The supplied passage comes from the lecture pages listed in the [Task 01 source note](task-01.md). The advice and warning were written for the prototype.

[First working task](https://github.com/NabsCodes/studycheck/commit/13fb206)

### 18–19 November · Frontend revisions

I asked for a simpler visual finish and raised two editor issues, one about the focus effect and one about Tailwind syntax in the stylesheet. When the font change went further than I wanted, I asked to use the usual Next.js font setup.

Codex replaced the focus effect with a heading that receives focus when the screen changes. It switched the font to Geist through `next/font` and adjusted the editor setup for Tailwind. Codex checked that keyboard focus still followed screen changes and returned to the notes opener when the notes were closed from below.

[Interface refinement](https://github.com/NabsCodes/studycheck/commit/ffd4525) · [Font and editor changes](https://github.com/NabsCodes/studycheck/commit/fd7d9bc)

### 19 November · Add two examples after checking Task 01

I confirmed that I had checked Task 01 and agreed to move on to the correct-advice and false-alarm examples. The other two reuse the same question and controls. Task 02 gives correct advice with a general reminder in both styles. Task 03 shows what happens when a targeted warning questions a claim the notes actually support.

Codex implemented the new examples and checked all six example and reminder combinations in the browser. It checked that the original answer stayed saved, that the session could be reset and that the review distinguished a displayed false alarm from a general reminder. The tests cover 108 combinations of example, reminder, initial and final choice, and notes access.

[Additional examples and checks](https://github.com/NabsCodes/studycheck/commit/b261798) · [Scenario notes](task-02-03.md)

### 24 November · Make the interaction visible in the report

I asked for a simpler diagram and for the figures to be checked against the rubric. The final diagram shows where the task content comes from, how the app keeps track of the answers and what feedback goes back to the student. The scripted advice and flag are marked in the diagram.

Codex replaced the schematic storyboards with excerpts from the running app. The first screenshots hid parts of the panels, so Codex retook them and kept the full originals. Task 01 now shows the notes control before and after opening, the final submit button and the saved review. Task 03 deliberately ends with a wrong answer to show the review for that path. The screenshots are scripted developer walkthroughs.

[Diagram and walkthroughs](architecture-and-examples.md) · [Screenshot capture record](storyboards/annotated/capture-record.json) · [Figure commit](https://github.com/NabsCodes/studycheck/commit/3fed9a0)

### 24–25 November · Clarify who did what

When I reviewed the report, the acknowledgement made Codex’s contribution sound smaller than it was. I asked for the acknowledgement to give me credit for the frontend layout and explain how much Codex produced. I also asked for a README that helps the marker run and inspect the project.

The README and report now describe my design contribution and name the code, tests and figures Codex produced and the writing it helped draft. The app notes link to the original lecture and credit the pages used for the paraphrase. Codex also generated the source-page icon.

[Frontend credit](https://github.com/NabsCodes/studycheck/commit/84153e7)

### 25 November · Final copy edits

I clarified that my degree is MSc Advanced Computer Science. The README and report now show the degree and module separately. Codex also tidied the reference for Cao et al., clarified the review captions and dated the older progress notes.

## Final checks · 25 November

Codex reran formatting, lint, type checks, ten tests and the production build against `84153e7`. All passed, and the production preview served the setup page and icon. The application code and lockfile match the version previously tested from a fresh GitHub clone. Codex checked the report's 1,229 counted words, public version links, rendered diagram and example pages, and matching OneDrive files.

The [full dated development notes](https://github.com/NabsCodes/studycheck/blob/84153e7dc61125fee68a25ea9fa882a49b6aff87/docs/development-record.md) retain the earlier checks, revisions and draft stages. The [manual check guide](manual-check.md) describes what to expect when running the app.
