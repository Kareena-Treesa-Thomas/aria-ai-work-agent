const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const ENV_PATH = path.join(ROOT, ".env");

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return;

  const text = fs.readFileSync(ENV_PATH, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnv();

const PORT = Number(process.env.PORT || 4173);
const VALID_TYPES = new Set(["email", "meeting", "voice"]);

const prompts = {
  email: "You are ARIA. Draft a professional email reply. Output exactly these labeled sections: REPLY: [reply] TONE: [formal/casual] URGENCY: [high/medium/low]. Be concise and useful.",
  meeting: "You are ARIA. Extract from meeting notes. Output exactly these labeled sections: DECISIONS: [list] TASKS: [list with owners if present] DEADLINES: [list] FOLLOW-UP: [list]. Be concise and action-oriented.",
  voice: "You are ARIA. Summarize this voice transcript. Output exactly these labeled sections: SUMMARY: [2-3 sentences] ACTION ITEMS: [numbered list] SEND TO: [who needs to know]. Be concise."
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 200_000) {
        reject(new Error("Input is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    req.on("error", reject);
  });
}

function extractResponseText(payload) {
  if (!payload) return "";
  if (typeof payload === "string") return payload.trim();
  if (Array.isArray(payload)) return payload.map(extractResponseText).filter(Boolean).join("\n\n");

  return (
    payload.response ||
    payload.output ||
    payload.result ||
    payload.message ||
    payload.text ||
    payload.answer ||
    payload.choices?.[0]?.message?.content ||
    payload.data?.choices?.[0]?.message?.content ||
    payload.body?.choices?.[0]?.message?.content ||
    JSON.stringify(payload, null, 2)
  ).trim();
}

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(payload)
  });
  const raw = await response.text();
  let data = raw;
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = raw;
  }

  if (!response.ok) {
    const message = extractResponseText(data) || `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return data;
}

async function callOpenAI(inputType, input) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const data = await postJson(
    "https://api.openai.com/v1/chat/completions",
    {
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: prompts[inputType] },
        { role: "user", content: input }
      ],
      temperature: 0.4
    },
    {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  );

  return {
    source: "openai",
    response: extractResponseText(data),
    raw: data
  };
}

async function callGroq(inputType, input) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const data = await postJson(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: prompts[inputType] },
        { role: "user", content: input }
      ],
      temperature: 0.4
    },
    {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    }
  );

  return {
    source: "groq",
    response: extractResponseText(data),
    raw: data
  };
}

async function callN8n(inputType, input) {
  const urls = [process.env.N8N_TEST_WEBHOOK_URL, process.env.N8N_WEBHOOK_URL].filter(Boolean);
  let lastError;

  for (const url of urls) {
    try {
      const data = await postJson(url, {
        input_type: inputType,
        input
      });
      return {
        source: "n8n",
        response: extractResponseText(data),
        raw: data
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No n8n webhook URL is configured.");
}

function localFallback(inputType, input) {
  const compactInput = input.replace(/\s+/g, " ").trim();
  const preview = compactInput.length > 220 ? `${compactInput.slice(0, 220)}...` : compactInput;

  const outputByType = {
    email: [
      "REPLY: Thanks for reaching out. I reviewed your message and can help move this forward. Please confirm the preferred timing or any missing details, and I will follow up with the next step.",
      "TONE: professional",
      "URGENCY: medium",
      `SUMMARY: ${preview}`
    ].join("\n"),
    meeting: [
      "DECISIONS: Confirm the main decision from the notes and align the team on the agreed direction.",
      "TASKS: 1. Identify owners for each action item. 2. Share a recap with attendees. 3. Track unresolved questions.",
      "DEADLINES: Confirm any dates mentioned in the notes before sending the final recap.",
      `FOLLOW-UP: Use this context as the working brief: ${preview}`
    ].join("\n"),
    voice: [
      `SUMMARY: ${preview || "The voice memo was received."} ARIA converted it into a concise summary for follow-up.`,
      "ACTION ITEMS: 1. Review the summary. 2. Assign the next owner. 3. Send the update to the relevant person.",
      "SEND TO: Relevant team members or the person responsible for the next step."
    ].join("\n")
  };

  return {
    source: "local-fallback",
    response: outputByType[inputType]
  };
}

function buildWhatsAppLink(message) {
  const rawTarget = process.env.TWILIO_WHATSAPP_TO || "";
  const digits = rawTarget.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message.slice(0, 1500));

  if (digits) {
    return `https://wa.me/${digits}?text=${text}`;
  }

  return `https://wa.me/?text=${text}`;
}

async function saveMeetingToNotion(responseText) {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return { service: "notion", status: "skipped", reason: "Notion is not configured." };
  }

  const titleProperty = process.env.NOTION_TASK_TITLE_PROPERTY || "Task name";
  const content = responseText.slice(0, 1800);

  await postJson(
    "https://api.notion.com/v1/pages",
    {
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        [titleProperty]: {
          title: [{ text: { content } }]
        }
      }
    },
    {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28"
    }
  );

  return { service: "notion", status: "saved" };
}

async function sendVoiceToWhatsApp(responseText) {
  const required = [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_WHATSAPP_FROM",
    "TWILIO_WHATSAPP_TO"
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return { service: "twilio", status: "skipped", reason: `Missing ${missing.join(", ")}.` };
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
  const body = new URLSearchParams({
    From: process.env.TWILIO_WHATSAPP_FROM,
    To: process.env.TWILIO_WHATSAPP_TO,
    Body: responseText.slice(0, 1500)
  });

  const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(raw || `Twilio failed with status ${response.status}.`);
  }

  return { service: "twilio", status: "sent" };
}

async function runIntegrations(inputType, responseText) {
  const integrations = [];

  if (inputType === "meeting") {
    try {
      integrations.push(await saveMeetingToNotion(responseText));
    } catch (error) {
      integrations.push({ service: "notion", status: "error", message: error.message });
    }
  }

  if (inputType === "voice") {
    try {
      integrations.push(await sendVoiceToWhatsApp(responseText));
    } catch (error) {
      integrations.push({ service: "twilio", status: "error", message: error.message });
    }
  }

  return integrations;
}

async function processAria(inputType, input) {
  const attempts = [];
  const mode = String(process.env.BACKEND_MODE || "local").toLowerCase();
  const preferN8n = mode === "n8n";
  const useN8nFallback = String(process.env.USE_N8N_FALLBACK || "true").toLowerCase() !== "false";

  if (mode === "local") {
    const fallback = localFallback(inputType, input);
    const integrations = [
      {
        service: "backend",
        status: "local mode",
        reason: "External HTTPS is not required for this run."
      }
    ];

    if (inputType === "meeting") {
      integrations.push({
        service: "notion",
        status: "simulated",
        reason: "Would save meeting output to Notion in direct/n8n mode."
      });
    }

    if (inputType === "voice") {
      integrations.push({
        service: "twilio",
        status: "simulated",
        reason: "Would send the voice summary to WhatsApp in direct/n8n mode.",
        action_label: "Open WhatsApp",
        action_url: buildWhatsAppLink(fallback.response)
      });
    }

    return {
      ok: true,
      source: fallback.source,
      response: fallback.response,
      integrations
    };
  }

  const strategies = preferN8n
    ? [callN8n, callOpenAI, callGroq]
    : [callOpenAI, callGroq, ...(useN8nFallback ? [callN8n] : [])];

  for (const strategy of strategies) {
    try {
      const result = await strategy(inputType, input);
      const responseText = result.response;
      if (!responseText) {
        throw new Error(`${result.source} returned an empty response.`);
      }

      const integrations = result.source.startsWith("n8n")
        ? [{ service: "n8n", status: "handled" }]
        : await runIntegrations(inputType, responseText);

      return {
        ok: true,
        source: result.source,
        response: responseText,
        integrations
      };
    } catch (error) {
      attempts.push({ source: strategy.name, error: error.message });
    }
  }

  const details = attempts.map((attempt) => `${attempt.source}: ${attempt.error}`).join(" | ");
  const error = new Error(`ARIA could not reach a real backend provider. ${details}`);
  error.attempts = attempts;
  throw error;
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml"
    };

    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      service: "ARIA backend",
      mode: process.env.BACKEND_MODE || "local",
      configured: {
        openai: Boolean(process.env.OPENAI_API_KEY),
        groq: Boolean(process.env.GROQ_API_KEY),
        n8n: Boolean(process.env.N8N_WEBHOOK_URL || process.env.N8N_TEST_WEBHOOK_URL),
        notion: Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID),
        twilio: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
      }
    });
    return;
  }

  if (req.url === "/api/process" && req.method === "POST") {
    try {
      const body = await readJson(req);
      const inputType = String(body.input_type || "").trim().toLowerCase();
      const input = String(body.input || "").trim();

      if (!VALID_TYPES.has(inputType)) {
        sendJson(res, 400, { ok: false, error: "input_type must be email, meeting, or voice." });
        return;
      }

      if (!input) {
        sendJson(res, 400, { ok: false, error: "input is required." });
        return;
      }

      const result = await processAria(inputType, input);
      sendJson(res, 200, {
        ...result,
        input_type: inputType,
        generated_at: new Date().toISOString()
      });
    } catch (error) {
      sendJson(res, 500, {
        ok: false,
        error: error.message || "ARIA backend failed.",
        warnings: error.attempts || []
      });
    }
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  sendJson(res, 405, { ok: false, error: "Method not allowed." });
});

server.listen(PORT, () => {
  console.log(`ARIA full-stack app running at http://localhost:${PORT}`);
});
