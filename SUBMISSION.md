# ARIA Hackathon Submission

## Project Name

ARIA - Automated Response Intelligence Agent

## One-Line Summary

ARIA turns emails, meeting notes, and voice transcripts into structured replies, tasks, summaries, and follow-ups.

## Problem Statement

People receive important work inputs in different formats. The useful next step is often buried in long emails, messy meeting notes, or informal voice transcripts. ARIA reduces that friction by converting raw text into a clear, useful output.

## Solution Overview

ARIA is a single-page work agent with three input modes:

- Email: produces `REPLY`, `TONE`, and `URGENCY`.
- Meeting Notes: produces `DECISIONS`, `TASKS`, `DEADLINES`, and `FOLLOW-UP`.
- Voice Memo: produces `SUMMARY`, `ACTION ITEMS`, and `SEND TO`, with a WhatsApp handoff link in local demo mode.

The frontend is responsive and futuristic. The backend keeps secrets out of the browser and can run in local demo mode, direct AI mode, or n8n mode.

In local demo mode, Notion is shown as a simulated integration status, and Twilio is shown as a simulated status with an `Open WhatsApp` handoff link. In direct or n8n mode, meeting outputs can be saved to Notion and voice summaries can be sent to WhatsApp through Twilio.

## Tech Stack

- HTML, CSS, JavaScript
- Node.js backend
- OpenAI API
- Groq API fallback
- n8n webhook workflow
- Notion API
- Twilio WhatsApp API

## How To Run

```bash
npm start
```

Open:

```text
http://localhost:4173
```

## Demo Flow

1. Open ARIA.
2. Select Email, Meeting Notes, or Voice Memo.
3. Paste sample input.
4. Click `Process with ARIA`.
5. Show the formatted response and copy button.
6. Explain backend modes:
   - `local` for offline demo
   - `direct` for OpenAI/Groq
   - `n8n` for workflow automation

## Current Local Mode Note

This environment blocks outbound HTTPS, so the checked-in local configuration uses:

```text
BACKEND_MODE=local
```

For production or deployment with internet access, use:

```text
BACKEND_MODE=direct
```

or:

```text
BACKEND_MODE=n8n
```

## Submission Checklist

- Working prototype: yes
- Source repository-ready project: yes
- Problem statement: yes
- Solution overview: yes
- Tech stack: yes
- Codex/OpenAI usage documented: yes
- Demo script included: yes
