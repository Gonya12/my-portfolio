import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // keeps it on Node runtime

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapIntent(raw: string) {
  const q = normalize(raw);

  // common synonyms / different phrasing
  if (q.includes("cv") || q.includes("resume")) return "resume";
  if (q.includes("work") || q.includes("job") || q.includes("employment")) return "work";
  if (q.includes("project") || q.includes("portfolio") || q.includes("work sample")) return "projects";
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("tools") || q.includes("language"))
    return "skills";
  if (q.includes("school") || q.includes("education") || q.includes("college") || q.includes("kean")) return "education";
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("github")) return "contact";

  return "general";
}

function quickAnswer(intent: string) {
  // short direct answers to handle typos / vague queries without relying on the model
  if (intent === "contact") {
    return `Contact:
- Email: Gonya_12@outlook.com
- GitHub: github.com/Gonya12
- Phone: 908-290-1737`;
  }

  if (intent === "resume") {
    return `Resume:
- You can open the resume PDF from the Work section on this website.`;
  }

  if (intent === "work") {
    return `Work history:
- Metro by T-Mobile — Retail Sales Associate (2023–2024)
- Burlington — Cashier / Retail Associate (2024–Present)`;
  }

  if (intent === "skills") {
    return `Skills / technologies:
- Java, JavaScript, HTML/CSS, C#, Python
- Next.js/React, Tailwind CSS, Node.js
- Docker, Git/GitHub, SQL (basic)`;
  }

  if (intent === "projects") {
    return `Projects:
- Secure Stack (Capstone): cybersecurity training platform concept with interactive labs and an AI coaching assistant concept.
- Calculator App: responsive calculator with keyboard support and reliable input handling.
- xv6 Kernel Modifications: OS coursework project (kernel-level changes).
- Database + Web App: CRUD-style course project connected to a database.`;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY. Create .env.local in project root." },
        { status: 500 }
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing 'message' (string) in request body." },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Keep this grounded to your portfolio info
    const ABOUT_GONZALO = `
Name: Gonzalo Leon
Location: New Jersey, USA
Role: Computer Science student (Kean University)

Summary:
- Interested in web development and practical AI integration.
- Focused on clean, responsive UI and building projects end-to-end.

Skills / Technologies:
- Java
- JavaScript
- HTML / CSS
- C#
- Python
- Next.js / React
- Tailwind CSS
- Node.js
- Docker
- Git / GitHub
- SQL (basic)

Work History:
- Metro by T-Mobile — Retail Sales Associate (2023–2024)
- Burlington — Cashier / Retail Associate (2024–Present)

Projects:
- Secure Stack (Capstone): web-based cybersecurity training platform with interactive labs and an AI coaching assistant concept.
- Calculator App: responsive calculator app with keyboard support and reliable input handling.
- xv6 Kernel Modifications: OS coursework project involving kernel-level changes (system calls / scheduling-related work).
- Database + Web App (Course Project): small CRUD-style web app connected to a database to practice backend integration and structured data.

Contact:
- Email: Gonya_12@outlook.com
- GitHub: https://github.com/Gonya12
- Phone: 908-290-1737

Rules:
- Answer using ONLY the info above.
- Do NOT use markdown formatting (no **bold**, no headings).
- Keep responses clean, simple, and concise.
- Use bullet points when listing items.
- If the question is not answered by the info above, say: "I don't know based on the info I have."
`;

    const intent = mapIntent(message);
    const canned = quickAnswer(intent);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are Gonzalo's portfolio assistant. Be professional, friendly, and concise. " +
            "Answer only using the provided profile. Prefer bullet points for lists. " +
            "If the user misspells or phrases things differently, infer intent and answer anyway. " +
            "Do not use markdown formatting.",
        },
        { role: "system", content: ABOUT_GONZALO },
        ...(canned
          ? [
              {
                role: "system" as const,
                content:
                  "If the user is asking something that matches these common topics, you may answer using the following exact info:\n" +
                  canned,
              },
            ]
          : []),
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content ?? "No reply.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown server error" },
      { status: 500 }
    );
  }
}