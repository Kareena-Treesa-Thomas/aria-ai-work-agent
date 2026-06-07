# ARIA - Automated Response Intelligence Agent

## Overview
ARIA is a basic MVP prototype of a miniature agentic AI assistant that converts raw work inputs into structured outputs. Users can paste an email, meeting notes, or a voice transcript, and ARIA generates a useful response such as a reply, task list, summary, follow-up plan, or WhatsApp handoff.

## Problem Statement
Work communication is often scattered across emails, meetings, and quick voice notes. Important actions can get missed because users must manually read, summarize, extract tasks, and decide what to do next. This wastes time and increases the chance of missed follow-ups.

## Solution
ARIA solves this by providing one simple interface for processing different types of work input. The user selects the input type, pastes the content, and receives a formatted AI-style output. The backend keeps secrets away from the browser and supports both local demo mode and production-ready integrations.

## Features
- Email mode: generates `REPLY`, `TONE`, `URGENCY`, and `SUMMARY`
- Meeting Notes mode: extracts `DECISIONS`, `TASKS`, `DEADLINES`, and `FOLLOW-UP`
- Voice Memo mode: generates `SUMMARY`, `ACTION ITEMS`, and `SEND TO`
- WhatsApp handoff: voice summaries include an `Open WhatsApp` link with the message prefilled
- Responsive single-page frontend with futuristic ARIA branding
- Local backend API at `/api/process`
- Copy-to-clipboard output panel
- Local demo mode for restricted-network environments
- Production-ready structure for OpenAI, Groq, n8n, Notion, and Twilio

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js HTTP server
- Database: Notion database integration support
- APIs: OpenAI API, Groq API, n8n Webhook, Notion API, Twilio WhatsApp API
- Hosting: Local Node server; deployable to Vercel, Render, Railway, or any Node-compatible host

## Codex / OpenAI Usage
Codex and OpenAI tools were used throughout the build process:

- Ideation: refined ARIA into a practical work-response intelligence agent
- Architecture planning: separated frontend UI, backend API, local mode, and production integrations
- Code generation: created the responsive frontend, backend routes, and integration helpers
- Debugging: corrected payload formats, backend modes, n8n workflow logic, and Twilio handoff behavior
- Testing: verified backend health, endpoint responses, input modes, and clean submission files
- Documentation: produced README, submission notes, AI usage notes, and demo script
- API integration: designed OpenAI/Groq prompts, n8n webhook fallback, Notion task flow, and Twilio WhatsApp handoff

In production mode, ARIA is designed to use OpenAI-compatible chat completions. In local mode, ARIA uses a built-in MVP response generator so the demo works even when outbound API calls are blocked.

## Demo
Demo / pitch video link: https://drive.google.com/file/d/184G77a7f82YoVbXmhnHFBe6fuF5dcs15/view?usp=drivesdk

```text
TODO: Add public demo or pitch video link here
```

Demo script:

```text
See DEMO_SCRIPT.md
```

Before final submission, make sure the demo or pitch video link is public and accessible without login permission.

## Screenshots
<img width="1917" height="1192" alt="01-home png" src="https://github.com/user-attachments/assets/d807dbd5-d82b-4e3a-8fa3-cecaf52cd4e8" />
<img width="1918" height="1187" alt="02-n8n-workflow png" src="https://github.com/user-attachments/assets/d7e5b840-59f0-4b4b-a58e-09b6d05108fb" />
<img width="1918" height="1198" alt="03-meeting-response png" src="https://github.com/user-attachments/assets/9db3313d-34ad-428b-b0af-5145c29ccc14" />
<img width="1918" height="1198" alt="04-email-response png" src="https://github.com/user-attachments/assets/cffe784d-4231-4895-b690-a1dad0ed4c1a" />
<img width="1918" height="1198" alt="05-voice-whatsapp-handoff png" src="https://github.com/user-attachments/assets/e2132818-5b42-48de-82c3-7eff458eaad0" />
<img width="1918" height="1197" alt="06-mobile-voice-view png" src="https://github.com/user-attachments/assets/38f80dce-fea5-4d07-b323-488c6202a72c" />



## Live / Hosted Link
Live / hosted project link:  https://github.com/Kareena-Treesa-Thomas/aria-ai-work-agent

```text
TODO: Add Vercel / Render / Railway / hosted link here, if available
```

Local development URL:

```text
http://localhost:4173
```

## How to Run Locally

```bash
git clone <https://github.com/Kareena-Treesa-Thomas/aria-ai-work-agent>
cd aria-ai-work-agent
npm install
npm run dev
```

Then open:

```text
http://localhost:4173
```

This project has no external npm dependencies, but `npm install` is safe to run.

## Environment Setup
The app runs in local demo mode by default.

For external integrations, copy `.env.example` to `.env` and add the required keys.

Local demo mode:

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

## Additional Files
- `SUBMISSION.md`: concise project submission details
- `AI_USAGE.md`: Codex and AI-assisted development explanation
- `DEMO_SCRIPT.md`: ready-to-read demo flow
- `LICENSE`: MIT License

## Security Note
Do not commit `.env` or any file containing API keys. Secrets should remain in backend environment variables only.

