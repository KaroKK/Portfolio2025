export type SkillGruppe = {
  id: string;
  titel: string;
  beschreibung: string;
  skills: { name: string; level: number }[];
};

export const skillGruppen: SkillGruppe[] = [
  {
    id: "sprachen",
    titel: "Sprachen & Web-Technologien",
    beschreibung: "Schnittstellen und Web-Clients.",
    skills: [
      { name: "Deutsch / Englisch / Polnisch", level: 90 },
      { name: "C#", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "Python", level: 85 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JSON / YAML", level: 80 },
    ],
  },
  {
    id: "frameworks",
    titel: "Frameworks & Tools",
    beschreibung: "Tools für Frontend, Backend und UI-Bewegung.",
    skills: [
      { name: "Next.js", level: 70 },
      { name: "React", level: 70 },
      { name: "GSAP", level: 65 },
      { name: "FastAPI", level: 80 },
      { name: "Flask", level: 70 },
      { name: "Bootstrap", level: 70 },
      { name: "Tailwind CSS", level: 75 },
      { name: "MySQL", level: 70 },
      { name: "PostgreSQL", level: 70 },
      { name: ".NET (ASP.NET Core, Windows Forms, WPF)", level: 80 },
    ],
  },
  {
    id: "methoden",
    titel: "Methoden",
    beschreibung: "Saubere Architektur, Auth-Flows und Planung.",
    skills: [
      { name: "Agile (Scrum)", level: 75 },
      { name: "Unit Tests", level: 70 },
      { name: "REST API Design", level: 85 },
      { name: "OAuth2 Token Flows", level: 75 },
      { name: "Client Credentials Flow", level: 75 },
      { name: "Authorization Code Flow", level: 70 },
    ],
  },
  {
    id: "devops",
    titel: "DevOps",
    beschreibung: "Bereitstellung, Überwachung und Versionierung.",
    skills: [
      { name: "Containerisierung mit Docker", level: 80 },
      { name: "Docker Compose", level: 80 },
      { name: "CI / CD-Pipelines (GitHub / GitLab)", level: 75 },
      { name: "Versionskontrolle mit Git", level: 75 },
    ],
  },
  {
    id: "iot-health",
    titel: "IoT Integration & Healthcare IT",
    beschreibung: "Integrationen in regulierten Umgebungen und Sensorik.",
    skills: [
      { name: "DICOM - C-FIND / C-STORE", level: 75 },
      { name: "pynetdicom", level: 75 },
      { name: "Webex Sensoren", level: 70 },
    ],
  },
  {
    id: "ai",
    titel: "AI & Automatisierung",
    beschreibung: "LLM als Werkzeug für Analyse und Automatisierung.",
    skills: [
      { name: "OpenAI API", level: 80 },
      { name: "LLM und GenAI Integration", level: 75 },
      { name: "Ollama", level: 45 },
    ],
  },
];

export const alleSkillNamen = skillGruppen.flatMap((gruppe) => gruppe.skills.map((skill) => skill.name));
