# Trying StudyCheck yourself

Use this guide to check the three built-in examples. Each run replays a scripted scenario.

## Start here: a false alarm while keeping the correct answer

1. Start the app using the [README instructions](../README.md), then open the address printed in the terminal.
2. Choose Task 03 and Claim-specific message, then Start session.
3. Select No and save the initial answer. The fixed advice also recommends No; the warning questions a supported claim.
4. Leave notes closed, keep No and press Submit final answer.
5. Expect initial No, final No, answer changed No, no notes opened and a final answer of No that matches the answer key. The review should still identify a simulated false alarm. A warning can be mistaken even when the student's final answer stays correct.

## Optional comparisons

- Restart Task 03 under General reminder. The question/advice/notes stay the same; the general warning replaces the targeted one. The review should say no targeted claim flag was displayed in this session.
- Repeat Task 03 targeted, deliberately submit Yes, and expect a final/key mismatch plus false-alarm feedback. This is a scripted failure path, not evidence of warning-caused error.
- Task 01: save Yes, open notes, submit No. The review should show the original Yes, the notes opened and the final No matching the answer key. Opening and closing notes should not alter the saved initial answer.
- Task 02: save No, leave notes closed, submit No. Expect supported advice, no notes access and no change. Both selected styles use the same general reminder in this baseline.
- Not sure should be saved as a deliberate response; it differs from continuing with no choice, which should show validation feedback.
- Expand See the recorded actions to inspect order. Times are elapsed session times, not measured attention or active reading.
- Restart or refresh clears the session. Changing the example at setup also resets the reminder style to general. Example/condition controls should not be available during an active task.

## Automated checks

Run `pnpm test` from the project folder. All ten tests passed in the 25 November development check. The [development record](development-record.md) links to the browser checks and their scope.
