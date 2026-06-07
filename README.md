# ARIA - Automated Response Intelligence Agent

## Overview
ARIA is a basic MVP prototype of a miniature agentic AI assistant that converts emails, meeting notes, and voice transcripts into structured replies, tasks, summaries, and follow-ups.

## Problem Statement
Work inputs often arrive in unstructured formats: long emails, scattered meeting notes, and quick voice memo transcripts. Important decisions, tasks, and next steps can be missed when users manually process each input.

## Solution
ARIA provides a single responsive web interface where users paste raw input, choose the input type, and receive a clean structured output. The backend separates secrets and integrations from the frontend and supports local demo mode plus production-ready AI and automation modes.

## Features
- Email mode: generates a professional reply, tone, urgency, and summary
- Meeting Notes mode: extracts decisions, tasks, deadlines, and follow-ups
- Voice Memo mode: creates a summary, action items, and recipient guidance
- WhatsApp handoff: Voice Memo mode shows an `Open WhatsApp` action with the summary prefilled
- Local backend API at `/api/process`
- Responsive futuristic ARIA interface
- Copy-to-clipboard response panel
- Local demo mode for restricted-network environments
- Production-ready backend structure for OpenAI, Groq, n8n, Notion, and Twilio

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js HTTP server
- Database: Notion database integration support
- APIs: OpenAI, Groq, n8n Webhook, Notion API, Twilio WhatsApp API
- Hosting: Local Node server; deployable to Vercel, Render, Railway, or any Node-compatible host

## Codex / OpenAI Usage
Codex was used throughout the build process:

- Ideation: refined ARIA as a focused work-response agent
- Architecture planning: separated frontend UI from backend API and secrets
- Code generation: built the responsive UI, backend routes, and integration helpers
- Debugging: corrected frontend/backend payload contracts and workflow behavior
- Testing: validated backend health, input modes, and endpoint responses
- Documentation: produced README, submission notes, AI usage notes, and demo script
- API integration: structured OpenAI/Groq prompts, n8n fallback design, Notion task flow, and Twilio WhatsApp handoff

OpenAI-compatible chat completions are supported in production mode. Local mode is included so the MVP can be demonstrated even when outbound API calls are unavailable.

## Demo
Demo / pitch video link:

```text
Add public demo video link here
```

Suggested demo script: [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)

## Screenshots
Add screenshots of your project here.

Suggested screenshots:
- ARIA home screen
- Email mode response
- Meeting Notes mode response
- Voice Memo mode with WhatsApp handoff

Screenshot placeholder folder: `screenshots/`

## Live / Hosted Link
Live project link:

```text
Add Vercel / Render / Railway / hosted link here
```

Current local development URL:

```text
http://localhost:4173
```

## GitHub Repository
Repository link:

```text
Add GitHub repo link here
```

If the repository is private, add this reviewer as a collaborator:

```text
vichured@gmail.com
```

## How to Run Locally

```bash
git clone <repo-url>
cd aria-ai-work-agent
npm install
npm run dev
```

Then open:

```text
http://localhost:4173
```

This project has no external npm dependencies, but `npm install` is safe to run.

## Environment
Copy `.env.example` to `.env` only when using external services.

Default local demo mode:

```text
BACKEND_MODE=local
```

Direct AI mode:

```text
BACKEND_MODE=direct
```

n8n workflow mode:

```text
BACKEND_MODE=n8n
```

## Additional Submission Files
- [SUBMISSION.md](./SUBMISSION.md)
- [AI_USAGE.md](./AI_USAGE.md)
- [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)

## Security Note
Do not commit `.env` or any file containing API keys. Keep secrets in the backend environment only.
