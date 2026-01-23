import type { StaticImageData } from "next/image";
import roomyImg from "../images/roomy.png";
import findailyImg from "../images/findaily.png";
import tandemImg from "../images/tandem.png";
import tomitosImg from "../images/tomitos.png";
import fahrradladenImg from "../images/Fahrradladen.png";
import phpImg from "../images/php.png";

export type Projekt = {
  titel: string;
  beschreibung: string;
  fokus: string;
  stack: string[];
  link: string;
  media:
    | { type: "image"; src: StaticImageData }
    | { type: "video"; src: string; poster?: StaticImageData };
  alt: string;
};

export const projekte: Projekt[] = [
  {
    titel: "Dicognose Prüftool für DICOM",
    beschreibung: "Web-App zur technischen Prüfung von DICOM-Kommunikation. PACS - C-Store und RIS-Worklist.",
    fokus: "Healthcare IT - DICOM Tests",
    stack: ["Python", "Flask", "pynetdicom", "SQLite", "LDAP"],
    link: "#",
    media: {
      type: "video",
      src: "/videos/dicognose.mp4",
    },
    alt: "Dicognose DICOM Prüftool UI",
  },
  {
    titel: "TandemFinder - Mitbewohner finden für die Wohnungssuche",
    beschreibung: "Matching von Wohn- und Mitbewohner-Konstellationen mit Swipe/Match-Logik.",
    fokus: "Matching - Plattform",
    stack: ["Python", "Flask", "SQLAlchemy", "Tailwind CSS", "JavaScript", "REST"],
    link: "#",
    media: {
      type: "image",
      src: tandemImg,
    },
    alt: "TandemFinder Matching UI",
  },
  {
    titel: "Roomy Raumbelegung",
    beschreibung:
      "Echtzeit-Anzeige der aktuellen Raumauslastung (belegt/ frei) über Webex-Sensoren und Darstellung der geplanten Outlook-Kalendertermine pro Raum mit Zeitraum und Organisator. ***** Aus Datenschutzgründen wurden echte Daten durch Beispielwerte ersetzt.*****",
    fokus: "IoT - Kalender-Integration",
    stack: ["Python", "Flask", "Webex-Sensoren-Integration", "Microsoft Graph API - für Termine aus Outlook", "OAuth2 Client Credentials"],
    link: "#",
    media: {
      type: "image",
      src: roomyImg,
    },
    alt: "Roomy Raumbelegung Dashboard",
  },
  {
    titel: "FinDaily Finanzverwaltung",
    beschreibung: "Verwaltung und Auswertung persönlicher Finanzen mit interaktiven Dashboards. Testkonto: Login: admin, Passwort: admin.",
    fokus: "Finance - Dashboards",
    stack: ["ASP.NET Core", "PostgreSQL", "PostgreSQL Cloud-Hosting über Neon", "Deployment und Hosting: Railway", "React + Vite", "Chart.js", "GSAP"],
    link: "https://findaily.up.railway.app/",
    media: {
      type: "image",
      src: findailyImg,
    },
    alt: "FinDaily Finanzdashboard",
  },
  {
    titel: "Tomitos Productions Portfolio",
    beschreibung: "Web-Portfolio für Film- und Videoprojekte mit Fokus auf visuelles Storytelling.",
    fokus: "Media - Interaktion",
    stack: ["Python", "Flask", "Jinja2", "Tailwind CSS", "JavaScript", "GSAP", "ScrollTrigger"],
    link: "https://www.tomitosproductions.com/",
    media: {
      type: "image",
      src: tomitosImg,
    },
    alt: "Tomitos Portfolio Ansicht",
  },
  {
    titel: "Fahrradladen - ERP",
    beschreibung: "ERP - Desktop Anwendung",
    fokus: "Retail - Verwaltung",
    stack: [".Net", "C#", "WPF", "MySQL"],
    link: "#",
    media: {
      type: "image",
      src: fahrradladenImg,
    },
    alt: "Fahrradladen Produktverwaltung UI",
  },
  {
    titel: "Dogs Community Forum",
    beschreibung: "Forum in PHP.",
    fokus: "Web - Forum",
    stack: ["PHP", "MySQL", "HTML"],
    link: "#",
    media: {
      type: "image",
      src: phpImg,
    },
    alt: "Forumoberfläche",
  },
];
