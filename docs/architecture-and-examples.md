# Architecture and illustrated examples

Prepared 24 November 2026 against application commit `b2617986c9e092168b9dce3a31fd0081b3e40277`. This identifies the inspected application source, not a designated submission version.

[Open the browser-readable figure pack](illustrated-examples.html). It contains the architecture figure, three annotated screenshot walkthroughs and expandable full screenshot originals. PNG exports are supplied for the report; SVG sources remain editable. Keep this HTML file with the adjacent assets when copying the pack.

## Figure refinement, 24 November

The revised diagram groups the implementation into local task content, session logic/review and the study interface, with the student outside the browser-application boundary. A dashed inset identifies scripted AI advice and claim flagging. It retains the answer-key input and both action/feedback loops without low-level filenames, extra component boxes or long return routes. Optional notes and the review remain explicitly visible as interface responsibilities. Their implementation detail is explained below.

The logic/review box groups the hook, reducer and review helper; it does not claim these run as a separate service or that the reducer stores the answer key. The key is passed from task content to the review logic. The original-lecture link is external navigation, not PDF ingestion. The figure was checked as a 720-pixel-wide preview as well as exported at 3,000 pixels. The first small preview exposed crowded human-feedback labels; these were repositioned before final export.

Suggested report caption: **StudyCheck components and information/control flows. Solid boxes are implemented responsibilities; the dashed inset identifies authored AI simulations. Session records remain in browser memory.**

The subsequent screenshot-refinement stage below completed the notes-access and final-submit illustrations. No application behaviour changed during either figure stage.

## What the diagram represents

The solid nodes are implemented logical responsibilities, not separate deployed services. Next.js serves the page and assets; the interaction runs in the browser. `StudyWorkspace` chooses an example outside the task and keys the shared `StudySession` by its identity. A different key discards the previous session state, while the example selector is absent during an active task.

The React hook dispatches actions to the pure reducer. Guarded transitions commit the initial answer before advice appears, preserve it while the final choice changes, and reject inappropriate or repeated actions. Post-commit effects record advice/notes presentation; the reducer deduplicates replayed or stale presentation events. Committed presentation is not proof of attention.

Local scenario content supplies the question, notes, expected answer, fixed advice, authored flag and warning strings. The dashed region locates the AI behaviour being simulated: generation of advice and a decision that a particular claim warrants a warning. No model, retrieval service, confidence estimator or error detector executes. Task 02 has no targeted flag, so both selected styles use the same general reminder.

`LectureNotes` displays a curated passage and its provenance. Its Canvas link opens the original lecture; the app does not ingest the PDF or retrieve passages from it. Session state and ordered elapsed events stay in browser memory. There is no persistence, analytics or export.

`SessionReview` combines those facts with the answer key and `adviceReview` logic. It distinguishes an erroneous recommendation, supported advice and a displayed targeted false alarm. This is key-based feedback, not an inference about learner knowledge or why an answer changed. The review is rendered back in the study interface, closing the feedback/control loop.

## Why this technical scope fits

React is used for controlled inputs and stage-dependent rendering; the reducer makes allowed changes explicit and directly testable. Separating content from the shared controls makes within-example condition matching inspectable. The keyed workspace prevents cross-example answer/event carry-over without adding storage machinery.

Next.js is a familiar project convention and supplies the route and local font/icon delivery; this prototype does not depend on a server-backed AI architecture. A database, model API and ingestion pipeline would add dependencies without being necessary to inspect the proposed warning–notes–answer interaction. Their absence is an explicit scope decision, not an unfinished working integration.

## The three illustrated paths

1. **Task 01, claim-specific condition:** a scripted initial Yes, incorrect advice recommending Yes, notes opened, final No. The review preserves Yes-to-No and notes access. This shows a correction in the script, not what caused it.
2. **Task 02, general condition:** initial No, correct advice recommending No, no notes, final No. The review identifies supported advice without a targeted flag. Both styles use the same general reminder in this baseline; it is not an active specificity comparison.
3. **Task 03, claim-specific condition:** initial No, correct advice recommending No, a warning on its supported claim, no notes, final Yes. Yes was deliberately selected by the developer to illustrate a failure path. The review reports a final/key mismatch and a simulated false alarm. This is not evidence that a warning caused a person to make an error.

The primary illustrated examples now use cropped actual screenshots with short numbered annotations. Eleven fresh full-page originals include the Task 01 notes-closed, notes-open and final-ready states. [Capture metadata](storyboards/annotated/capture-record.json) records hashes, source version, exact crop rectangles and definition-list facts read from each review. Screenshots are embedded in SVG viewports; no UI text, selected control or note passage was redrawn. Earlier schematic drafts and their original capture record remain development history. No elapsed reading time or participant outcome is inferred. Replaying one question does not produce independent observations or estimates of warning effectiveness.

## Figure files

- [System architecture SVG](system-architecture.svg) and [PNG](system-architecture.png).
- Task 01 [walkthrough SVG](storyboards/annotated/task-01-walkthrough.svg) and [PNG](storyboards/annotated/task-01-walkthrough.png).
- Task 02 [walkthrough SVG](storyboards/annotated/task-02-walkthrough.svg) and [PNG](storyboards/annotated/task-02-walkthrough.png).
- Task 03 [walkthrough SVG](storyboards/annotated/task-03-walkthrough.svg) and [PNG](storyboards/annotated/task-03-walkthrough.png).

The assembled report review copy now contains the rationale, abstract, figures, references and acknowledgement; final requirements and genuine repository/version links remain outstanding. These figures are not a submitted report or evidence of Canvas submission. Codex assisted with code inspection, scripted capture, figure preparation and verification; Hassan retains the final academic judgement.

## Screenshot refinement, 24 November

Task 01 now shows five numbered steps: save Yes before advice, inspect the incorrect advice and targeted warning, open the optional notes, select No and explicitly submit, then inspect the saved review. The notes opening uses two consecutive screenshots from the same replay, so the closed control and opened passage are visible. The notes screenshot was taken before the final choice changed.

Tasks 02 and 03 each show four steps, including the unchanged notes-access control and the final-submit button. Their reviews identify supported advice and a simulated false alarm respectively. Task 03's wrong final Yes was intentionally selected by the developer. None of the examples is a participant observation or an estimate of warning effectiveness.

The supplied full-length SVG/PNG compositions are inspection assets. Task 01 is taller because notes opening is illustrated explicitly; split its numbered panels across report figures if needed rather than shrinking controls until illegible. Review-table details are available in full originals. Final figure sizing and legibility must be checked in the exported report; this stage is not that final PDF check.

## Figure identification

The primary figure pack and annotated exports use Task 01–03 labels rather than capture dates in their presentation headings/footers. Capture dates, source versions, hashes and dated development entries remain evidence records. Student identification belongs on the submission report's first page; no student number was added to these reusable figures or the public-facing README. Original screenshot pixels, including lecture source-check provenance, are unchanged.

## Report integration

The Word/PDF review copy was assembled on 24 November. After the requested Times New Roman/APA abstract revision, all twelve pages were rendered and visually inspected. Screenshot excerpts were placed individually at readable sizes rather than shrinking the tall HTML compositions. Task 01 occupies two parts of one illustrated example; Tasks 02 and 03 each have one page. Cropped screenshot pixels are unchanged and source hashes/crop rectangles are retained with the report assets. Task 03 shows the actual false-alarm review text. Final publication/version links and submission sign-off are still pending.
