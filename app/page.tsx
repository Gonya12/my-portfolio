import Image from "next/image";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import FadeIn from "@/components/FadeIn";

const skills = [
  "Java",
  "JavaScript",
  "HTML / CSS",
  "C#",
  "Python",
  "Next.js / React",
  "Tailwind CSS",
  "Node.js",
  "Docker",
  "Git / GitHub",
  "SQL (basic)",
];

const workHistory = [
  {
    company: "Metro by T-Mobile",
    role: "Retail Sales Associate",
    time: "2023 – 2024",
    bullets: [
      "Troubleshot devices and helped customers set up accounts and services.",
      "Worked in a fast-paced environment and communicated clearly with customers.",
    ],
  },
  {
    company: "Burlington",
    role: "Cashier / Retail Associate",
    time: "2024 – Present",
    bullets: [
      "Handled high-volume transactions accurately and provided customer support.",
      "Worked as part of a team and stayed reliable under busy shifts.",
    ],
  },
];

const projects = [
  {
    title: "Secure Stack (Capstone)",
    desc: "A web-based cybersecurity training platform with interactive labs and an AI coaching assistant concept. Built with a focus on deployment, structure, and scalable design.",
    tags: ["Web", "AI", "Docker", "Team Project"],
    link: "#",
  },
  {
    title: "Calculator App",
    desc: "A clean calculator app with keyboard support and responsive UI. Focused on good UX and reliable input handling.",
    tags: ["JavaScript", "UI", "Responsive"],
    link: "#",
  },
  {
    title: "xv6 Kernel Modifications",
    desc: "Operating Systems coursework project involving kernel-level changes (system calls and scheduling-related work) to understand OS internals.",
    tags: ["C", "OS", "Kernel"],
    link: "#",
  },
  {
    title: "Database + Web App (Course Project)",
    desc: "A small web app connected to a database (CRUD features) to practice backend integration and structured data handling.",
    tags: ["SQL", "Backend", "Web"],
    link: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#05070c] via-[#070b14] to-black">
      <Navbar />

      {/* HERO */}
      <section id="home" className="pt-28 pb-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <div>
              <p className="text-gray-400 mb-3">Computer Science Student</p>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Hello, I’m <span className="text-[#4682B4]">Gonzalo Leon</span>
              </h1>

              <p className="text-gray-300 mt-5 max-w-xl">
                I’m a Computer Science student at Kean University based in New
                Jersey. I build modern web apps, enjoy problem-solving, and I’m
                learning how to integrate AI into real projects.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="bg-[#4682B4] text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
                >
                  View Projects
                </a>

                <a
                  href="#work"
                  className="border border-gray-700 px-6 py-3 rounded-full font-semibold hover:border-white transition"
                >
                  Work History
                </a>

                <a
                  href="#contact"
                  className="border border-[#4682B4] text-[#90b6d8] px-6 py-3 rounded-full font-semibold hover:bg-[#4682B4] hover:text-black transition"
                >
                  Contact
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <Stat value="Next.js" label="Framework" />
                <Stat value="AI" label="Integration" />
                <Stat value="4+" label="Projects" />
                <Stat value="GitHub" label="Collaboration" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#4682B4] shadow-[0_0_30px_rgba(70,130,180,0.25)]">
                <Image
                  src="/profile.jpg"
                  alt="Gonzalo profile photo"
                  fill
                  className="object-cover object-[center_30%]"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-4">About</h2>
            <p className="text-gray-300 max-w-3xl">
              I’m focused on building strong fundamentals in software engineering
              while developing projects that combine web development and practical
              AI features. I like clean design, responsive layouts, and writing
              code that’s maintainable and easy to expand.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-10">Skills</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((s) => (
                <div
                  key={s}
                  className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl p-4 hover:border-[#4682B4] transition"
                >
                  <p className="text-gray-100 font-semibold">{s}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-16 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-10">Work</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {workHistory.map((j) => (
                  <div
                    key={j.company}
                    className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-xl font-semibold">
                        {j.role} — {j.company}
                      </h3>
                      <span className="text-sm text-gray-400">{j.time}</span>
                    </div>

                    <ul className="mt-4 space-y-2 text-gray-300">
                      {j.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="text-[#4682B4]">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* One resume link (only here) */}
              <a
                href="/resume.pdf"
                target="_blank"
                className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl p-6 hover:border-[#4682B4] transition h-fit block"
              >
                <p className="text-sm text-gray-400">Resume</p>
                <h3 className="text-2xl font-semibold mt-2">
                  View Full Resume →
                </h3>
                <p className="text-gray-300 mt-3">
                  Open the PDF version of my resume.
                </p>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-10">Projects</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <a
                  key={p.title}
                  href={p.link}
                  className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl p-6 hover:border-white transition block"
                >
                  <h3 className="text-2xl font-semibold mb-3">{p.title}</h3>
                  <p className="text-gray-300 mb-5">{p.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs border border-gray-700 text-gray-200 px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-6">Contact</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-200 font-semibold">Gonzalo Leon</p>
                <p className="text-gray-400">New Jersey, USA</p>

                <div className="mt-4 space-y-2">
                  <p className="text-gray-300">
                    Phone: <span className="text-gray-100">908-290-1737</span>
                  </p>

                  <p className="text-gray-300">
                    Email:{" "}
                    <a
                      className="text-[#90b6d8] hover:text-white transition"
                      href="mailto:Gonya_12@outlook.com"
                    >
                      Gonya_12@outlook.com
                    </a>
                  </p>

                  <p className="text-gray-300">
                    GitHub:{" "}
                    <a
                      className="text-[#90b6d8] hover:text-white transition"
                      href="https://github.com/Gonya12"
                      target="_blank"
                    >
                      github.com/Gonya12
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-300">
                  Use the AI assistant (bottom-right) to ask about my skills,
                  work history, or projects.
                </p>

                <div className="mt-5 flex gap-3">
                  <a
                    href="#home"
                    className="border border-gray-700 px-5 py-3 rounded-full font-semibold hover:border-white transition"
                  >
                    Back to top
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-gray-900 py-10 text-center text-gray-500">
        © {new Date().getFullYear()} Gonzalo Leon — Next.js + Tailwind + AI
      </footer>

      <ChatWidget />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#0c1220]/70 border border-gray-800 rounded-2xl py-4 hover:border-[#4682B4] transition">
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}