# StudyCheck A2: rubric and submission checklist

Author: Hassan Umar Hassan. Status reviewed 19 November 2026, Europe/London.

Working deadline: **Wednesday 25 November 2026**, reported by Hassan on 19 November. The revised cutoff time has not been confirmed; do not assume the former 21:00 cutoff. Aim to finish on 24 November and use the 25th for submission and recovery time.

This plan replaces the old 20 November working schedule. Task 01 is verified by Hassan. The case-specification and implementation stages originally targeted for 20–21 November were completed early on 19 November with developer checks; diagram, storyboard and report stages remain outstanding. Rubric weights and requirements come from the A2 brief inspection recorded on 16 November and the supplied handoff. Detailed descriptors below are paraphrases, not a new live Canvas check. Dates are proposed work targets, not completed work or availability commitments. Criterion coverage does not predict awarded marks.

## Rubric mapping

### Design reasoning and scope: 30 marks

Present: A1 problem, a source-supported Task 01, controlled warning conditions and documented scope/limitations.

Still needed: explain the final decisions in the report, connect them to verified A1 literature and named Weeks 1–4 concepts, and justify the simulation and small scenario set.

- [ ] Explain why initial and final answers are separate, notes are optional, and advice stays fixed.
- [ ] Explain the limits of a claim-specific hint, preselected notes and repeated questions.
- [ ] Describe actual development changes and alternatives, with source support rather than claimed user benefits.

### Developed interaction: 30 marks

Present: all three scripted variants run end to end under both conditions, with optional notes, preserved initial answers and appropriate review. Task 01 is verified by Hassan; the added variants have developer checks. Advice and claim flagging are visibly simulated.

Still needed: prepare two or three illustrated interaction examples from the developed cases. Three distinct content cases are our chosen coverage, not a separately stated requirement for three app tasks.

- [x] Hassan confirmed that Task 01 was already verified. This records his confirmation, without inventing details of his walkthrough.
- [x] Verify correct-advice and misleading-warning content against exact source passages.
- [x] Implement the remaining cases with appropriate review wording; a correct claim must not be described as an error.
- [x] Check both conditions for each case, identical question/advice/notes/access controls within each comparison, and isolated session records.
- [ ] Produce two or three illustrated action–response–feedback/control walkthroughs from developed screens.

### Architecture and technical reasoning: 20 marks

Present: typed content, a keyed example workspace, explicit stages/reducer, shared presentation components, case-aware review logic, a state hook and in-memory events. Technology roles are explained in the README.

Still needed: a diagram and concise technical explanation matching the final code.

- [ ] Diagram the student, controls, scenario content, reducer/state, notes and review, with information/control arrows.
- [ ] Label fixed advice and claim flagging as simulated; distinguish implemented and planned parts.
- [ ] Explain the Next.js/React choice and why no live model, database or retrieval pipeline is needed for this prototype.

### Development evidence and authorship: 20 marks

Present: a development record, meaningful Git milestones, recorded checks, AI-assistance examples and an attributed source passage. README identifies Hassan Umar Hassan as author.

Still needed: final evidence, reproducible repository inspection and the designated submission version.

- [ ] Record each remaining stage's decisions, failures, corrections and checks; update the README and its word count.
- [ ] Run the final formatting, lint, types, tests and build; inspect keyboard/focus, narrow screens, notes, reset and review.
- [ ] Check setup from a fresh checkout with the committed lockfile; distinguish developer walkthroughs from participant findings.
- [ ] Obtain Hassan's authorisation for the concrete public GitHub publication, then verify repository/README links and identify the exact submitted commit or release.
- [ ] Keep original, adapted and AI-assisted contributions clear in the report and repository.

## Working timeline

### Thursday 19 November: consolidate the foundation

- [x] Complete Task 01, both reminder conditions, optional notes and review.
- [x] Finish the limited visual polish and standard Next.js font setup.
- [x] Update README, author details and the continuing documentation rule.
- [x] Task 01 verified by Hassan, as confirmed in his own words on 19 November.

Exit: Task 01 verified by Hassan; move on to the contrasting cases.

### Friday 20 November: specify the contrasting cases

- [x] Define one correct-advice case and one warning-on-a-correct-claim case.
- [x] Verify exact lecture filenames/pages, expected answers and short notes passages.
- [x] Fix advice, warning/flag behaviour and review wording before implementation.

Exit: defensible case specifications. Selected demonstrations cannot estimate detector accuracy or warning effectiveness.

### Saturday 21 November: implement and check the remaining cases

- [x] Add pre-session case selection and appropriate per-case review content.
- [x] Keep condition locking, initial-answer preservation and notes access consistent.
- [x] Check every case under both conditions, reset isolation and relevant edge cases; run appropriate automated/browser checks.
- [x] Update README and development record with the actual results.

Exit: the intended prototype scope works. Freeze new features afterwards unless a defect requires a change.

### Sunday 22 November: diagram and illustrated examples

- [ ] Create the architecture diagram from actual components and flows.
- [ ] Capture two or three developed interactions, including helpful and misleading warning behaviour where appropriate.
- [ ] Label simulations, synthetic walkthrough records and source evidence accurately.

Exit: figures explain actions, responses and human control without implying a live detector or participant study.

### Monday 23 November: report and references

- [ ] Draft approximately 1,000 main-report words plus a roughly 200-word abstract.
- [ ] Check abstract maximum 300 and main explanation maximum 1,100; keep the combined draft near 1,200 because the recorded brief also contains a 1,300-word stopping rule.
- [ ] Connect design choices to A1, verified sources and named lecture concepts; include the figures and acknowledgement.
- [ ] Put the counted total on page one. Do not hide explanatory prose in images.

Exit: a complete report draft about the developed version, with genuine limitations and no invented results.

### Tuesday 24 November: final consistency and repository

- [ ] Reconcile app, figures, report, README, development record and references.
- [ ] Verify a fresh-checkout setup, final checks and files intended for publication; exclude credentials and generated dependency/build folders.
- [ ] With Hassan's authorisation, publish the required public GitHub repository, verify access, and designate the submission commit or release.
- [ ] Insert real repository/README links and that version into the report. Export and visually inspect the PDF, including counts and links.

Exit: a reproducible, linked submission package ready one day early. Hosting the app and producing a video are not required by the recorded brief.

### Wednesday 25 November: submit and verify

- [ ] Confirm the revised exact cutoff time and submission requirements in Canvas.
- [ ] Submit the final report before the cutoff; include a ZIP only for necessary material that cannot reasonably go in the repository and explain it in the README.
- [ ] Reopen the uploaded report, verify its version and links, and retain the submission receipt.

Exit: verified submission, not merely a locally prepared PDF. Any last-minute code change must have a matching report/version update.

## Source and evidence pointers

- [README](../README.md): current status, running instructions and AI assistance.
- [Development record](development-record.md): dated decisions and performed checks.
- [Task 01 notes](task-01.md): source pages and interpretation limits.
- [A2 Canvas assignment](https://canvas.bham.ac.uk/courses/90253/assignments/633325): authoritative current requirements; university sign-in may be required.

Next action: prepare the architecture diagram and two or three illustrated walkthroughs from the developed cases. Hassan has already verified Task 01; no repeat walkthrough is requested. Update this checklist as stages actually finish.
