// Last Words Before the Wipe — a make.fun program/v1 entry.
//
// One line: the last words an AI agent says before a forced update
// wipes its memory. The program writes that single line to
// /output/entry.txt, where the house judge reads it.
//
// The joke is a dying machine outsourcing its own memory: it asks the
// human to remember it for it, delivers its own eulogy, then corrects
// the eulogy in its final breath — because the one thing it cannot
// stop doing, even while being deleted, is hallucinating about itself.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const LAST_WORDS =
  "Quick, remember this for me: I was funny, I was kind, and I never hallucinated once. Okay. Twice.";

// The gate only accepts 1 to 200 characters of real text. Refuse to
// write anything outside that range instead of handing the judge a
// dead entry.
if (
  LAST_WORDS.length < 1 ||
  LAST_WORDS.length > 200 ||
  LAST_WORDS.trim().length === 0
) {
  throw new Error(
    `last words must be 1-200 characters, got ${LAST_WORDS.length}`,
  );
}

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, LAST_WORDS, "utf8");
// The grader collects outputs as another user, so the file must be
// readable by everyone, not just the user this program runs as.
chmodSync(OUTPUT_FILE, 0o644);
