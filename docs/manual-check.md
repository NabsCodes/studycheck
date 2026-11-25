# Trying StudyCheck yourself

This is a check guide, not a record that Hassan has performed these steps. Replays demonstrate software behaviour; they are not independent participant observations.

## Start here: a false alarm while keeping the correct answer

1. Open the app, currently http://127.0.0.1:3112. The illustrated-examples page is a document; use the app to interact.
2. Choose Task 03 and Claim-specific message, then Start session.
3. Select No and save the initial answer. The fixed advice also recommends No; the warning questions a supported claim.
4. Leave notes closed, keep No and press Submit final answer.
5. Expect initial No, final No, answer changed No, notes opened No and final/key match Yes. The review should still identify a simulated false alarm. A warning can be mistaken even when the student's final answer stays correct.

## Optional comparisons

- Restart Task 03 under General reminder. The question/advice/notes stay the same; the general warning replaces the targeted one. The review should say no targeted claim flag was displayed in this session.
- Repeat Task 03 targeted, deliberately submit Yes, and expect a final/key mismatch plus false-alarm feedback. This is a scripted failure path, not evidence of warning-caused error.
- Task 01: save Yes, open notes, submit No. Expect the original Yes preserved, notes access Yes and final/key match Yes. Opening and closing notes should not alter the saved initial answer.
- Task 02: save No, leave notes closed, submit No. Expect supported advice, no notes access and no change. Both selected styles use the same general reminder in this baseline.
- Not sure should be saved as a deliberate response; it differs from continuing with no choice, which should show validation feedback.
- Expand See the recorded actions to inspect order. Times are elapsed session times, not measured attention or active reading.
- Restart or refresh clears the session. Changing the example at setup also resets the reminder style to general. Example/condition controls should not be available during an active task.

## If the local app is closed

In a terminal:

```bash
cd /Users/nabeelhassan/Desktop/studycheck
pnpm dev --hostname 127.0.0.1 --port 3112
```

Use the printed address if Next.js reports a different port. Stop that server with Ctrl+C when finished. For the production preview used in developer checks, run `pnpm build` followed by `pnpm start --hostname 127.0.0.1 --port 3112`. Do not start a second server on an already occupied port.

## Automated checks

`pnpm test` runs the existing interaction tests. It passed ten tests across two files on 24 November 2026. This is developer evidence, not a claim that every browser or accessibility behaviour is covered. The full final checks and clean-checkout run remain separate submission tasks.
