# Daily Adventure Pilot

This is the first pilot-ready rebuild of Daily Adventure for families who do not have technical backgrounds.

The goal is simple:

- Parents open one app link.
- Parents create a family profile.
- The learner gets a focused daily learning view.
- Parents open dashboard/setup/admin tools through a Parent PIN.
- The pilot organizer gets a simple admin view behind the parent area.
- Families can leave feedback without needing technical setup.
- The app can be saved to a phone home screen with a Daily Adventure icon.

This first version uses browser storage so the product flow can be tested quickly. The code is structured so the storage layer can be replaced with Supabase for the real pilot.

The starter question bank is generic. It does not use any private family information, names, routines, or learning data.

## Pages In This Prototype

- **Family Setup**: parent creates a learner profile, age range, starting level, goals, interests, PIN, and voice style.
- **Learner App**: short daily activity cards chosen from a reusable question bank based on the learner's goals and interests, with answer choices, text/dictation responses, and optional ElevenLabs voice prompts.
- **Parent Area**: setup, dashboard, and admin tools are tucked behind the Parent PIN. Once unlocked, parents can move between parent tools without re-entering the PIN until they tap Lock or reload the app.
- **Parent Dashboard**: progress, answer attempts, Talk Time, practice suggestions, natural tester feedback prompts, and export.
- **Pilot Admin**: family list, recent activity, feedback counts, and export data behind the parent area.
- **Home Screen App Icon**: `manifest.webmanifest` and `icons/` help the app save cleanly on iPhone and mobile browsers.
- **ElevenLabs Audio**: `audio/` contains the pilot MP3 prompts. Browser voice is only used as a fallback if audio cannot play.
- **ElevenLabs Prompts**: `elevenlabs-prompts.txt` contains the copy-ready voice lines used to create the audio.

## Question Levels

The starter question bank uses three readiness levels:

1. **Beginner**: short, concrete questions.
2. **Growing**: a little more thinking or language.
3. **Confident**: more independent reasoning.

Age range gives a gentle suggestion, but the parent-selected starting level guides the daily question mix.

## Tester Feedback Prompts

The Parent Dashboard includes natural, voice-ready feedback prompts. The pilot now plays the exported ElevenLabs MP3s from `audio/` when available.

The prompts ask parents to notice:

- the first minute of setup
- what the learner seemed to enjoy
- where the learner looked confused or distracted
- what one thing should change before another family tries it

See `elevenlabs-prompts.txt` for the full copy/paste recording script.

## Add To iPhone Home Screen

1. Open the app link in Safari on iPhone.
2. Tap the Share button.
3. Tap **Add to Home Screen**.
4. Tap **Add**.

Daily Adventure should then appear on the home screen with the app icon.

## Next Technical Step

Replace `localStore` in `app.js` with a Supabase-backed store:

- families
- learners
- activity_sessions
- activity_attempts
- talk_time_responses
- parent_notes
- pilot_feedback

See `supabase-schema.sql` for the starter database shape.

## Run Locally

Open `index.html` in a browser.

No install step is required for this prototype.
