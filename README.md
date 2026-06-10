<div align="center">

# ⚡ ARIA
### Automated Response Intelligence Agent

*You dump the input. ARIA handles what comes next.*

[![Built at Codex Hackathon](https://img.shields.io/badge/⚡%20Codex%20Community%20Hackathon-Kochi%202025-6366f1?style=for-the-badge)](https://github.com/Kareena-Treesa-Thomas/aria-ai-work-agent)
[![Status](https://img.shields.io/badge/Status-v0.1%20Live-22c55e?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-94a3b8?style=for-the-badge)](LICENSE)

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-22c55e?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Groq](https://img.shields.io/badge/Groq-f59e0b?style=flat-square)](https://groq.com)
[![n8n](https://img.shields.io/badge/n8n-ea4b71?style=flat-square&logo=n8n&logoColor=white)](https://n8n.io)
[![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)](https://notion.so)
[![Twilio](https://img.shields.io/badge/Twilio-e11d48?style=flat-square&logo=twilio&logoColor=white)](https://twilio.com)
[![OpenAI](https://img.shields.io/badge/OpenAI%20Codex-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com)

<br/>

> 🏆 **Built overnight at [Codex Community Hackathon Kochi](https://github.com/Kareena-Treesa-Thomas/aria-ai-work-agent) · TinkerSpace, Kalamassery · June 2025**

</div>

---

## 🎯 What is ARIA?

Work inputs are everywhere — and they never stop.

Emails that need replies. Meetings full of decisions nobody documented. Voice memos with action items no one followed up on. Every day, professionals lose hours **processing** information instead of **acting** on it.

**ARIA eliminates that gap.**

It is a domain-specific AI work agent with a single, focused purpose — take any raw work input and return a clean, structured, immediately actionable output. No reformatting. No tool-switching. No context lost.

One interface. Three intelligent modes. Zero friction.

---

## 🎬 Demo

<div align="center">

📹 **[Watch Pitch Video](https://drive.google.com/file/d/184G77a7f82YoVbXmhnHFBe6fuF5dcs15/view?usp=drivesdk)** · 🔗 **[GitHub Repository](https://github.com/Kareena-Treesa-Thomas/aria-ai-work-agent)**

</div>

<br/>

| 🏠 Home Interface | ⚙️ n8n Workflow | 📝 Meeting Response |
|:---:|:---:|:---:|
| ![Home](https://github.com/user-attachments/assets/d807dbd5-d82b-4e3a-8fa3-cecaf52cd4e8) | ![n8n](https://github.com/user-attachments/assets/d7e5b840-59f0-4b4b-a58e-09b6d05108fb) | ![Meeting](https://github.com/user-attachments/assets/9db3313d-34ad-428b-b0af-5145c29ccc14) |

| 📧 Email Response | 🎙️ Voice + WhatsApp | 📱 Mobile View |
|:---:|:---:|:---:|
| ![Email](https://github.com/user-attachments/assets/cffe784d-4231-4895-b690-a1dad0ed4c1a) | ![WhatsApp](https://github.com/user-attachments/assets/e2132818-5b42-48de-82c3-7eff458eaad0) | ![Mobile](https://github.com/user-attachments/assets/38f80dce-fea5-4d07-b323-488c6202a72c) |

---

## ⚡ Core Modes

<table>
<tr>
<td width="33%" align="center">

### 📧 Email Mode
*Raw email in → structured reply out*

`REPLY DRAFT`
`TONE ANALYSIS`
`URGENCY SCORE`
`SUMMARY`

</td>
<td width="33%" align="center">

### 📝 Meeting Notes Mode
*Transcript in → decisions out*

`KEY DECISIONS`
`TASK LIST`
`DEADLINES`
`FOLLOW-UPS`

</td>
<td width="33%" align="center">

### 🎙️ Voice Memo Mode
*Voice transcript in → actions out*

`SUMMARY`
`ACTION ITEMS`
`WHATSAPP HANDOFF`
`SEND TO`

</td>
</tr>
</table>

**Additional capabilities:**
- 📲 WhatsApp handoff — voice summaries include a prefilled `Open WhatsApp` link via Twilio
- 📋 Copy-to-clipboard output panel
- 🔒 Local demo mode — fully functional without external API configuration
- 📱 Responsive mobile-friendly interface
- 🔗 Notion API integration for persistent task storage
- ⚙️ n8n webhook workflow for agent orchestration

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────┐
│                   ARIA v0.1                      │
├─────────────────────────────────────────────────┤
│  Frontend     HTML · CSS · JavaScript            │
│  Backend      Node.js HTTP Server                │
│  AI Engine    Groq API · OpenAI Completions      │
│  Automation   n8n Webhook Workflow               │
│  Database     Notion API                         │
│  Messaging    Twilio WhatsApp API                │
│  Built With   OpenAI Codex · AI-assisted dev     │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/Kareena-Treesa-Thomas/aria-ai-work-agent
cd aria-ai-work-agent
npm install
npm run dev
```

Open `http://localhost:4173`

> ✅ Runs in **local demo mode** by default — no API keys needed to try it.

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env` and choose your mode:

```env
# ── Local Demo (default) ──────────────────────────
BACKEND_MODE=local

# ── Direct AI via Groq ────────────────────────────
BACKEND_MODE=direct
GROQ_API_KEY=your_key_here

# ── Route through n8n Workflow ────────────────────
BACKEND_MODE=n8n
N8N_WEBHOOK_URL=your_webhook_url
```

> ⚠️ Never commit `.env` or expose API keys in the frontend. All secrets stay server-side.

---

## 📁 Project Structure

```
aria-ai-work-agent/
├── public/
│   └── index.html           # Single-page frontend
├── server/
│   └── index.js             # Node.js backend + /api/process route
├── .env.example             # Environment variable template
├── SUBMISSION.md            # Hackathon submission details
├── AI_USAGE.md              # Codex + AI-assisted development notes
├── DEMO_SCRIPT.md           # Demo walkthrough script
└── README.md
```

---

## 🤖 How Codex Powered ARIA

ARIA was built end-to-end with **OpenAI Codex** as the primary development partner:

| Phase | Codex Contribution |
|---|---|
| **Ideation** | Refined core concept into a focused agentic work assistant |
| **Architecture** | Designed frontend, backend, local mode, and production integration layers |
| **Code Generation** | Frontend UI, backend routes, API integration helpers |
| **Debugging** | Payload formats, n8n workflow logic, Twilio handoff behavior |
| **Prompt Engineering** | Optimised Groq prompts for each of the three input modes |
| **Documentation** | README, submission notes, demo script |

---

## 🔌 Integration Matrix

| Service | Purpose | Environment |
|---|---|---|
| **Groq** | Primary LLM inference | `direct` |
| **OpenAI** | Fallback completions | `direct` |
| **n8n** | Agent workflow orchestration | `n8n` |
| **Notion** | Persistent task database | production |
| **Twilio** | WhatsApp message handoff | production |

---

## 🗺️ Product Roadmap

```
v0.1 ──────────── v1.0 ──────────── v2.0
 ✅ Done           🔄 Building       🚀 Vision
Hackathon MVP    Production App   Autonomous Agent
```

---

### ✅ v0.1 — Hackathon MVP
> *Built overnight at Codex Community Hackathon Kochi · June 2025*

- Three core modes — Email, Meeting Notes, Voice Memo
- Node.js backend with Groq API inference
- n8n webhook workflow integration
- Twilio WhatsApp handoff
- Notion task storage
- Local demo mode with zero-config setup
- Responsive futuristic single-page UI

---

### 🔄 v1.0 — Production Release
> *Transforming the MVP into a fully deployed, user-ready product*

- **Real n8n workflow** — production-grade multi-layer agent orchestration
- **AI-native UI redesign** — clean, minimal, zero-friction interface
- **User authentication** — secure sign-up, login, and account management
- **Output history** — persistent session storage and output recall
- **Public cloud deployment** — live and accessible to real users
- **Cross-device optimization** — seamless experience on laptop and mobile

---

### 🚀 v2.0 — Autonomous Agent Platform
> *ARIA evolves from a responsive tool into a proactive autonomous teammate*

- **📬 Gmail Integration** — ARIA monitors your inbox and processes emails automatically — no manual input required
- **📅 Calendar Integration** — joins meetings, listens, and extracts structured notes autonomously
- **💬 Autonomous WhatsApp** — proactively sends summaries and action items via Twilio without being prompted
- **🧠 Memory Layer** — persistent context and user preferences across all sessions
- **🎛️ Orchestration Layer** — intelligent multi-step routing between input types and action handlers
- **📊 Agent Dashboard** — unified real-time view of all pending actions, decisions, and follow-ups
- **📱 Mobile App** — native React Native application for iOS and Android
- **🔔 Push Notifications** — real-time alerts for processed inputs and priority actions

> **The Vision:**
> ARIA v2.0 is not a tool you open.
> It is a teammate that works alongside you — 24/7, across every channel, without being asked.

---

## 📁 Planned Repository Structure — v2.0

```
aria-ai-work-agent/
├── frontend/                # React web application
├── mobile/                  # React Native iOS + Android
├── backend/                 # Node.js API server
├── workflows/               # n8n automation workflows
├── agents/                  # Orchestration + memory layer
├── integrations/            # Gmail · Calendar · Twilio · Notion
├── .env.example
└── README.md

Branch Strategy:
├── main          → stable production
├── v0.1          → hackathon submission (frozen)
├── v1.0          → current development
└── v2.0          → autonomous platform
```

---

## 👩‍💻 Author

<div align="center">

**Kareena Treesa Thomas**
2nd Year · Muthoot Institute of Technology and Science, Kochi

[![GitHub](https://img.shields.io/badge/GitHub-Kareena--Treesa--Thomas-181717?style=flat-square&logo=github)](https://github.com/Kareena-Treesa-Thomas)

</div>

---

<div align="center">

**MIT License © 2025 Kareena Treesa Thomas**

*Built with ⚡ OpenAI Codex at Codex Community Hackathon Kochi*

</div>
