# Codex / OpenAI Usage

## How Codex Was Used

Codex assisted with:

- Designing the single-page ARIA frontend.
- Building responsive CSS and animations.
- Implementing the Node.js backend.
- Creating `/api/process` for frontend-backend communication.
- Correcting the n8n workflow contract.
- Adding input modes for email, meeting notes, and voice memos.
- Creating response formatting for labels such as `REPLY`, `TASKS`, and `SUMMARY`.
- Adding project documentation and submission materials.

## How OpenAI Is Used In The Product

In production mode, ARIA sends the selected input type and user text to a backend AI completion flow. The backend prompt changes based on the selected mode:

- Email: draft a reply.
- Meeting Notes: extract decisions and tasks.
- Voice Memo: summarize and create action items.

The frontend never stores or exposes API keys.

## AI-Assisted Development Process

Codex was used meaningfully during:

- Ideation
- Architecture
- Coding
- Debugging
- Backend contract correction
- Documentation
- Local validation

## Human Decisions

The project scope, workflow idea, hackathon direction, and integration goals were provided by the participant. Codex helped turn that direction into a working prototype.

