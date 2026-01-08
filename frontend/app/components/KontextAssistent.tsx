"use client";

import { useEffect, useState } from "react";
import "../styles/sidebrain.css";
import { alleSkillNamen } from "../data/skills";
import { projekte } from "../data/projects";
import { ModusId } from "../types/modi";

const skillAliasse: Record<string, string[]> = {
  ".NET (ASP.NET Core, Windows Forms, WPF)": [
    ".net",
    "net",
    ".net core",
    "net core",
    "dotnet",
    "asp.net",
    "asp net",
    "asp.net core",
    "asp net core",
    "microsoft frameworks",
    "microsoft .net",
    "wpf",
    "windows forms",
  ],
  Bootstrap: ["bootstrap"],
  "Tailwind CSS": ["tailwind"],
  "Next.js": ["nextjs", "next js", "next.js"],
  React: ["react"],
  GSAP: ["gsap", "greensock"],
  JavaScript: ["javascript", "js"],
  TypeScript: ["typescript", "ts"],
  HTML: ["html", "html5"],
  CSS: ["css", "css3"],
  Python: ["python"],
  Flask: ["flask"],
  FastAPI: ["fastapi", "fast api"],
  MySQL: ["mysql"],
  PostgreSQL: ["postgresql"],
  "Containerisierung mit Docker": ["docker", "container"],
  "Docker Compose": ["docker compose", "compose file", "docker-compose"],
  "CI / CD-Pipelines (GitHub / GitLab)": [
    "ci/cd",
    "ci cd",
    "ci",
    "ci-cd",
    "ci / cd",
    "ci/cd pipelines",
    "ci cd pipelines",
    "ci pipeline",
    "ci pipelines",
    "cd pipelines",
    "continuous integration",
    "continuous integration ci",
    "continuous integration (ci)",
    "continuous integration pipeline",
    "continuous integration pipelines",
    "continuous integration / delivery",
    "continuous-integration",
    "continuous-integration ci",
    "continuous-integration pipeline",
    "kontinuierliche integration",
    "kontinuierliche integration ci",
    "kontinuierliche integration (ci)",
    "continuous delivery",
  ],
  "Versionskontrolle mit Git": ["git", "gitlab", "github"],
  "OAuth2 Token Flows": ["oauth2", "oauth 2", "oauth"],
  "REST API Design": ["rest", "rest api"],
  "Agile (Scrum)": ["scrum", "agile"],
  "Unit Tests": ["unit tests", "automatisierte tests", "automatisierten tests", "automated tests"],
  "Deutsch / Englisch / Polnisch": [
    "deutsch",
    "englisch",
    "english",
    "german",
    "polnisch",
    "polish",
    "de/en",
    "de/en/pl",
    "deutsch englisch polnisch",
    "sprachkenntnisse deutsch",
    "sprachkenntnisse englisch",
    "sprachkenntnisse polnisch",
    "sprachkenntnisse de",
    "sprachkenntnisse en",
    "sprachkenntnisse pl",
  ],
  "OpenAI API": ["openai", "openai api"],
  "LLM und GenAI Integration": ["llm", "genai", "gen ai", "ai integration"],
  "DICOM - C-FIND / C-STORE - Integration": ["dicom", "c-find", "c-store"],
  pynetdicom: ["pynetdicom"],
  "Webex Sensoren": ["webex sensoren", "webex sensor"],
  "Azure Logic Apps": ["azure logic apps", "logic apps"],
};

// Vereinheitlicht Texte, damit die Skill-Erkennung robuste Vergleiche durchführen kann.
const normalisiereText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00e4\u00f6\u00fc\u00df.+#\s/-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// Prüft, ob ein Begriff im Text vorkommt - mit Wortgrenzen, damit kurze Tokens nicht falsch matchen.
const trifftBegriff = (text: string, term: string) => {
  const candidate = term.toLowerCase().trim();
  if (!candidate) return false;
  const escaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (candidate.length <= 2) {
    const exact = new RegExp(`(?:^|\\s)${escaped}(?=\\s|/|$)`);
    return exact.test(text);
  }
  const boundaryPattern = new RegExp(`(?:^|\\s)${escaped}(?=\\s|/|$)`);
  return boundaryPattern.test(text);
};

const erstePositionDesBegriffs = (text: string, term: string): number => {
  const candidate = term.toLowerCase().trim();
  if (!candidate) return Number.POSITIVE_INFINITY;
  const escaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundaryPattern = new RegExp(`(?:^|\\s)${escaped}(?=\\s|$)`);
  const boundaryMatch = text.search(boundaryPattern);
  if (boundaryMatch !== -1) return boundaryMatch;
  return text.indexOf(candidate);
};

const humanisiereAuswertung = (text: string) => {
  if (!text) return "";

  const ersetzungen: { pattern: RegExp; ersatz: string }[] = [
    { pattern: /\bumfassend(e[nrsm]?|es)?\b/gi, ersatz: "" },
    { pattern: /\bumfangreich(e[nrsm]?|es)?\b/gi, ersatz: "" },
    { pattern: /\b(exzellent|hervorragend|herausragend|ausgezeichnet|erstklassig)\b/gi, ersatz: "gut" },
    { pattern: /\bbeeindruckend(e[nrsm]?|es)?\b/gi, ersatz: "" },
    { pattern: /\bausgeprägt(e[nrsm]?|es)?\b/gi, ersatz: "klar" },
    { pattern: /\bbreit gefächert(e?n?)\b/gi, ersatz: "breite" },
    { pattern: /\bstark(e[nrsm]?|es)?\b/gi, ersatz: "" },
  ];

  const reduziert = ersetzungen.reduce((acc, regel) => acc.replace(regel.pattern, regel.ersatz), text);
  const gestrafft = reduziert
    .replace(/\s{2,}/g, " ")
    .replace(/\s+\./g, ".")
    .replace(/\s+,/g, ",")
    .trim();

  const saetze = gestrafft
    .split(/(?:\r?\n)+|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return saetze.join(" ").trim() || gestrafft;
};

type KontextAssistentProps = {
  open: boolean;
  introReady: boolean;
  aktiverModus: ModusId;
  onToggle: () => void;
  onHighlightSkills: (skills: string[]) => void;
  showToggle?: boolean;
};

type TrefferProjekt = {
  titel: string;
  fokus: string;
  beschreibung: string;
  stack: string[];
  match: string[];
};

const personaKontext =
  "Sprachen: Deutsch (C1), Englisch (C1), Polnisch (Muttersprache). Standort: Berlin. Remote/Homeoffice bevorzugt, offen für Hybrid. Anspruch: automatisierte Tests, Clean Code, Architektur, Code-Qualität.";

export default function KontextAssistent({
  open,
  introReady,
  aktiverModus,
  onToggle,
  onHighlightSkills,
  showToggle = true,
}: KontextAssistentProps) {
  const modusLabel: Record<ModusId, string> = {
    ueberblick: "Projekte",
    skills: "Skills",
    projekte: "Projekte",
    kontakt: "Kontakt",
  };

  const grundNotiz = "Passe ich zu deinem Projekt/ Job?";
  const [notiz, setNotiz] = useState(grundNotiz);
  const [eingabe, setEingabe] = useState("");
  const [laedt, setLaedt] = useState(false);
  const [hatAntwort, setHatAntwort] = useState(false);
  const [trefferSkills, setTrefferSkills] = useState<string[]>([]);
  const [trefferProjekte, setTrefferProjekte] = useState<TrefferProjekt[]>([]);

  useEffect(() => {
    setNotiz(grundNotiz);
    setHatAntwort(false);
    setTrefferSkills([]);
    setTrefferProjekte([]);
  }, [aktiverModus]);

  // Prüft grob, welche Projekte thematisch zu den erkannten Skills passen.
  const findePassendeProjekte = (skills: string[]) => {
    const skillsLower = skills.map((skill) => skill.toLowerCase());
    return projekte
      .map((projekt) => {
        const match = projekt.stack.filter((tech) =>
          skillsLower.some((hit) => tech.toLowerCase().includes(hit))
        );
        return { ...projekt, match };
      })
      .filter((projekt) => projekt.match.length);
  };

  const analysiereText = async () => {
    if (!eingabe.trim()) {
      setNotiz("Hier kannst du die Anforderungen einer Stelle oder ein komplettes Stellenangebot einfügen. Das System prüft automatisch, wie gut diese Anforderungen zu meinen Skills und Projekten passen.");
      return;
    }

    setLaedt(true);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
      const endpoint = apiBase ? `${apiBase}/aiSkillsLens` : "/aiSkillsLens";

      const antwort = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: eingabe }),
      });

      const daten = await antwort.json();
      const auswertung = humanisiereAuswertung(daten.analyse || "");
      const textGesamt = normalisiereText(`${eingabe} ${personaKontext}`);
      const trefferSortiert = alleSkillNamen
        .map((skill) => {
          const aliases = skillAliasse[skill] ?? [];
          const base = aliases.length ? aliases : [skill];
          const candidates = base.map((term) => term.toLowerCase());
          const hits = candidates.filter((term) => trifftBegriff(textGesamt, term));
          if (!hits.length) return null;
          const pos = Math.min(
            ...candidates.map((term) => erstePositionDesBegriffs(textGesamt, term)).filter((value) => value >= 0)
          );
          return { skill, pos };
        })
        .filter((entry): entry is { skill: string; pos: number } => Boolean(entry))
        .sort((a, b) => a.pos - b.pos)
        .slice(0, 14)
        .map((entry) => entry.skill);

      const treffer = trefferSortiert;
      const passendeProjekte = treffer.length ? findePassendeProjekte(treffer) : [];

      onHighlightSkills(treffer.length ? treffer : []);
      setTrefferSkills(treffer);
      setTrefferProjekte(passendeProjekte);
      setNotiz(auswertung);
      setHatAntwort(true);
    } catch (error) {
      setNotiz("Backend nicht erreichbar. Bitte erneut versuchen.");
    } finally {
      setLaedt(false);
    }
  };

  const schliesseAntwort = () => {
    setNotiz(grundNotiz);
    setHatAntwort(false);
    onHighlightSkills([]);
    setTrefferSkills([]);
    setTrefferProjekte([]);
  };

  const baueNotizListe = (text: string) => {
    const zeilen = text
      .replace(/-\s+/g, "\n- ")
      .replace(/Ÿ?T'?ô“ô©\s*/g, "\n- ")
      .split("\n")
      .map((zeile) => zeile.trim().replace(/^-+\s*/, ""))
      .filter((zeile) => {
        if (!zeile.length) return false;
        const lower = zeile.toLowerCase();
        if (lower.includes("projekte")) return false;
        if (lower.includes("stack:")) return false;
        if (lower.includes("rolle/ergebnis")) return false;
        if (lower.startsWith("tech:")) return false;
        if (lower.startsWith("match:")) return false;
        if (lower.includes("frontend-entwicklung")) return false;
        if (lower.includes("mehrjaehr") || lower.includes("mehrjähr")) return false;
        return true;
      });
    if (!zeilen.length) return null;
    return (
      <ul className="brain-listing compact">
        {zeilen.map((zeile, index) => (
          <li key={index} className="brain-line">
            {zeile}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <aside className={`side-brain ${introReady ? "" : "preload"} ${open ? "" : "closed"}`}>
      <div className="brain-header">
        <div className="brain-title">
          <h3>Assistent</h3>
          <span className="brain-chip">{modusLabel[aktiverModus]} Modus</span>
        </div>
        {showToggle && (
        <button className="brain-icon-btn" onClick={onToggle} aria-label={open ? "Assistent schließen" : "Assistent öffnen"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 6 18 18M18 6 6 18" strokeWidth="1.6" />
          </svg>
        </button>
        )}
      </div>

      <div className="brain-body">
        {!hatAntwort && <div className="brain-note">{notiz}</div>}

        {hatAntwort && (
          <div className="brain-actions">
            <button className="brain-icon-btn" onClick={schliesseAntwort} aria-label="Antwort schließen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 6 18 18M18 6 6 18" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        )}

        <textarea
          className="brain-textarea"
          placeholder="Hier kannst du die Anforderungen einer Stelle oder ein komplettes Stellenangebot einfügen. Das System prüft automatisch, wie gut diese Anforderungen zu meinen Skills und Projekten passen."
          value={eingabe}
          onChange={(event) => setEingabe(event.target.value)}
        />

        <div className="brain-actions">
          <button className="brain-btn secondary" onClick={() => setEingabe("")}>
            Zurücksetzen
          </button>
          <button className="brain-btn" onClick={analysiereText} disabled={laedt}>
            {laedt ? "Analysiere..." : "Auf Skills mappen"}
          </button>
        </div>

        {hatAntwort && (
          <div className="brain-results">
            <div className="brain-section">
              <div className="brain-section-title">Analyse</div>
              <div className="brain-note small">
                {baueNotizListe(notiz) || <span className="brain-line">{notiz || "Mapping bereit. Markierte Skills zeigen die Nähe."}</span>}
              </div>
            </div>

            <div className="brain-section">
              <div className="brain-section-title">Skills erkannt</div>
              {trefferSkills.length ? (
                <div className="brain-tags">
                  {trefferSkills.map((skill) => (
                    <span key={skill} className="brain-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="brain-empty">Keine Skills erkannt.</div>
              )}
            </div>

            <div className="brain-section">
              <div className="brain-section-title">Passende Projekte</div>
              {trefferProjekte.length ? (
                <ul className="brain-listing">
                  {trefferProjekte.slice(0, 3).map((projekt) => (
                    <li key={projekt.titel}>
                      <div className="brain-project-title">{projekt.titel}</div>
                      <div className="brain-project-sub">{projekt.fokus}</div>
                      <div className="brain-line">Tech: {projekt.stack.slice(0, 4).join(" | ")}</div>
                      {projekt.match.length > 0 && (
                        <div className="brain-line">Match: {projekt.match.slice(0, 3).join(" | ")}</div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="brain-empty">Noch keine Projekt-Treffer.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
