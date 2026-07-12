# Daily Adventure Pilot

This is the first pilot-ready rebuild of Daily Adventure for families who do not have technical backgrounds.

The goal is simple:

- Parents open one app link.
- Parents create a family profile.
- The child gets a daily learning view.
- Parents get a dashboard.
- The pilot organizer gets a simple admin view.
- Families can leave feedback without needing technical setup.

This first version uses browser storage so the product flow can be tested quickly. The code is structured so the storage layer can be replaced with Supabase for the real pilot.

The starter question bank is generic. It does not use any private family information, names, routines, or learning data.

## Pages In This Prototype

- **Family Setup**: parent creates a child profile, goals, interests, PIN, and voice style.
- **Child App**: short daily activity cards chosen from a reusable question bank based on the child's goals and interests, with an optional browser voice prompt.
- **Parent Dashboard**: progress, Talk Time, practice suggestions, parent feedback, and export.
- **Pilot Admin**: family list, recent activity, feedback counts, and export data.

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
