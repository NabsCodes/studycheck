# Task 01: source, decisions and boundaries

## Foundation

Hassan's submitted A1, _Uncertainty Messages and Students' Verification of AI Study Answers_, distinguishes following AI advice, accessing sources and correcting errors. It proposes comparing general reminders with claim-specific uncertainty messages. A2 develops an inspectable prototype of that interaction; it has not conducted that empirical comparison.

The handoff and accessible assignment/documents provided the foundation. The original prior conversation was not assumed accessible. Hassan approved the proposed full-flow wireframe and selected a local Desktop project outside OneDrive. The detailed planning documents remain in the IIS chat workspace; this file records the implementation-relevant decisions.

## Task content and provenance

The exact versioned content is in `content/scenarios.ts`. The expected answer is No: a working citation alone does not establish that a passage supports the attached answer.

Source: University of Birmingham IIS, Week 4, Lecture 11, `W04_L11_Retrieval_Grounding_and_Provenance.pdf`.

- PDF page 5, **Different sources, different failures**: an answer can ignore the passage it cites.
- PDF page 8, **What grounding does and does not guarantee**: grounding makes claims checkable but does not guarantee truth, currency or use of a passage.
- PDF page 10, **Four things a citation has to do**: citations should be specific and honest about which claim is supported.

[Original lecture in Canvas](https://canvas.bham.ac.uk/courses/90253/files/22521218). The referenced pages were read and visually checked during task specification on 17 November 2026. These are one-based PDF page positions, not separately printed slide numbers. The check date is not a publication date. The source PDF is not included in this repository. The in-app notes are an authored paraphrase of these pages, not a lecturer quotation.

The question assumes a genuine, current passage; this does not assert the currency of a particular source. The deliberately erroneous advice overclaims that citation guarantees support. The advice and warning are fixed authored content, not outputs from a live model.

## Scope decisions

The original answer is committed before advice appears and cannot be overwritten by final-answer editing. The condition is chosen outside the task and stays locked until restart. Advice, question, note content and access controls stay identical between conditions; only warning wording changes. Each warning has 27 whitespace-separated words, but wrapping, specificity and reading difficulty can still differ. The targeted message can hint at the answer without consultation.

Notes are optional, open inline and remain available before final submission. The short preselected passage removes much of the search effort of a full course corpus. The final choice begins with the original choice, but submission is explicit. Not sure is an uncertain response, distinct from an unselected field. Correctness is a comparison with the task key, not a learner ability score.

The diagram later must label advice generation and claim flagging as simulated. The actual code handles choices, presentation, notes, validation and event records. It does not implement a model, retrieval pipeline, confidence estimator, learner model or automatic error detector. The earlier labs' assistant revision path must be adapted: here the student revises while AI advice stays fixed.

## Recording and interpretation

One session exists in browser memory. It stores version identifiers, condition, committed initial choice, final selection/submission and ordered events with elapsed timestamps. No session data is sent to an application backend or analytics provider. React effects record advice/notes presentation after DOM commit; reducer guards deduplicate development effect replay. Presentation is not proof of attention. Reset or refresh discards the session; no database, localStorage or export is included.

Opening notes does not establish reading or comprehension. Agreement with the AI recommendation is not a complete reliance measure. A changed answer is not necessarily corrected; a correct answer after note access does not show what caused it, identify the student's reasoning or demonstrate learning. Elapsed time is not active study time. No participant observations, task difficulty results or effectiveness findings have been invented.

Replaying the same question reveals its answer and is useful for inspection, not independent experimental comparison. Hassan confirmed this interaction was already verified on 19 November. The correct-advice and misleading-warning variants are now implemented; see [Tasks 02–03](task-02-03.md). Selected cases cannot estimate detector accuracy or warning-fatigue effects. Newly used primary-paper claims need original-source verification; the A1 papers were not freshly rechecked during implementation.

## Design connections

Week 1's human-control and capability-boundary concepts inform explicit simulation labels and student choice. Week 2's recognition and feedback concepts support the visible initial answer and confirmation of the submitted result. Signal detection motivates the later false-alarm example. Week 3's interaction-pattern comparison supports persistent structured screens. Week 4's provenance and observed-action distinction informs source labels and a review derived from actual state/events. These are design rationales, not measured benefits of this application.
