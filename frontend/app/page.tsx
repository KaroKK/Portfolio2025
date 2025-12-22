"use client";

import { useEffect, useMemo, useState } from "react";
import "./styles/shell.css";
import "./styles/sidebrain.css";
import { projekte } from "./data/projects";
import { skillGruppen } from "./data/skills";
import KontextAssistent from "./components/KontextAssistent";

const kontaktwege = [
  { label: "Mail", value: "kuster.karolina@yahoo.com", href: "mailto:kuster.karolina@yahoo.com", hint: "Antwort < 24h" },
  { label: "LinkedIn", value: "linkedin.com/in/karolina-kuster-ba278b394/", href: "https://www.linkedin.com/in/karolina-kuster-ba278b394/", hint: "Vernetzen" },
  { label: "GitHub", value: "github.com/#", href: "https://github.com/#", hint: "Code & Projekte" },
];

export default function HomePage() {
  const [assistentOffen, setAssistentOffen] = useState(false);
  const [markierteSkills, setMarkierteSkills] = useState<string[]>([]);
  const eindeutigeMarkierungen = useMemo(() => Array.from(new Set(markierteSkills)), [markierteSkills]);

  useEffect(() => setAssistentOffen(false), []);

  return (
    <div className="modern-page">
      <header className="topbar">
        <div>
          <div className="eyebrow">Full-Stack & KI</div>
          <h1>Karolina Kuster</h1>
        </div>
        <nav className="top-nav">
          <a href="#projects">Projekte</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Kontakt</a>
        </nav>
        <div className="top-cta">
          <a className="btn ghost" href="#projects">Projekte</a>
          <a className="btn solid" href="#contact">Kontakt</a>
        </div>
      </header>

      <main className="page-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Ich baue Webanwendungen & KI-Integrationen</p>
            <h2>Schnelle Prototypen, saubere Architektur, Fokus auf Nutzwert.</h2>
            <p className="lede">
              Frontend/Backend mit TypeScript, Python und .NET plus Automatisierung und LLM-Integrationen. Remote aus Berlin.
            </p>
            <div className="hero-actions">
              <a className="btn solid" href="#projects">Meine Arbeit</a>
              <button className="btn ghost" onClick={() => setAssistentOffen(true)}>Requirements einfügen</button>
            </div>
            <div className="hero-tags">
              <span>Next.js</span>
              <span>FastAPI</span>
              <span>Docker</span>
              <span>CI/CD</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-highlight">
              <div>
                <div className="pill">Letztes Projekt</div>
                <h3>Healthcare DICOM Prüftool</h3>
                <p>Technische Tests für PACS/RIS mit Python & Flask.</p>
              </div>
              <a className="text-link" href="#projects">Details ansehen</a>
            </div>
            <div className="hero-stats">
              <div><strong>10+</strong><span>Projekte</span></div>
              <div><strong>3</strong><span>Sprachen</span></div>
              <div><strong>CI/CD</strong><span>Produktiv</span></div>
            </div>
          </div>
        </section>

        <section className="section" id="stack">
          <div className="section-head">
            <div>
              <div className="eyebrow">Stack & Tools</div>
              <h3>Technologien, die ich aktiv nutze</h3>
            </div>
          </div>
          <div className="stack-scroller">
            {skillGruppen.flatMap((gruppe) => gruppe.skills).slice(0, 12).map((skill) => (
              <div key={skill.name} className={`stack-chip ${eindeutigeMarkierungen.includes(skill.name) ? "highlight" : ""}`}>
                <div>{skill.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-head">
            <div>
              <div className="eyebrow">Projekte</div>
              <h3>Ausgewählte Arbeiten</h3>
            </div>
          </div>
          <div className="project-grid">
            {projekte.map((projekt) => (
              <article key={projekt.titel} className="project-card-modern">
                <div className="project-thumb-modern">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={projekt.image.src} alt={projekt.alt} loading="lazy" />
                  <div className="project-pill">{projekt.fokus}</div>
                </div>
                <div className="project-body">
                  <h4>{projekt.titel}</h4>
                  <p>{projekt.beschreibung}</p>
                  <div className="project-tags">
                    {projekt.stack.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <a className="text-link" href={projekt.link} target="_blank" rel="noreferrer">Zum Projekt</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-head">
            <div>
              <div className="eyebrow">Capabilities</div>
              <h3>Schwerpunkte und Stärken</h3>
            </div>
          </div>
          <div className="capability-grid">
            {skillGruppen.map((gruppe) => (
              <div key={gruppe.id} className="capability-card">
                <div className="capability-head">
                  <h4>{gruppe.titel}</h4>
                  <p>{gruppe.beschreibung}</p>
                </div>
                <div className="capability-tags">
                  {gruppe.skills.map((skill) => {
                    const markiert = eindeutigeMarkierungen.includes(skill.name);
                    return <span key={skill.name} className={markiert ? "hit" : ""}>{skill.name}</span>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-head">
            <div>
              <div className="eyebrow">Kontakt</div>
              <h3>Lass uns sprechen</h3>
            </div>
          </div>
          <div className="contact-grid-modern">
            {kontaktwege.map((k) => (
              <a key={k.label} href={k.href} className="contact-card-modern" target="_blank" rel="noreferrer">
                <div className="pill subtle">{k.hint}</div>
                <h4>{k.label}</h4>
                <p>{k.value}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <button className="assistant-fab" onClick={() => setAssistentOffen(true)} aria-label="Assistent öffnen">
        Assist
      </button>

      <KontextAssistent
        open={assistentOffen}
        introReady={true}
        aktiverModus="ueberblick"
        onToggle={() => setAssistentOffen((o) => !o)}
        onHighlightSkills={setMarkierteSkills}
      />
    </div>
  );
}
