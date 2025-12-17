import type { StaticImageData } from "next/image";
import dicognoseImg from "../images/dicognose.png";
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
  image: StaticImageData;
  alt: string;
};

export const projekte: Projekt[] = [
  {
    titel: "Dicognose Prueftool fuer DICOM",
    beschreibung: "Web-App zur technischen Pruefung von DICOM-Kommunikation. PACS - C-Store und RIS-Worklist.",
    fokus: "Healthcare IT - DICOM Tests",
    stack: ["Python", "Flask", "pynetdicom", "SQLite", "LDAP"],
    link: "#",
    image: dicognoseImg,
    alt: "Dicognose DICOM Prueftool UI",
  },
    {
    titel: "TandemFinder - Mitbewohner finden für die Wohnungssuche",
    beschreibung: "Matching von Wohn- und Mitbewohner-Konstellationen mit Swipe/Match-Logik.",
    fokus: "Matching - Plattform",
    stack: ["Python", "Flask", "SQLAlchemy", "Tailwind CSS", "JavaScript", "REST"],
    link: "#",
    image: tandemImg,
    alt: "TandemFinder Matching UI",
  },
  {
    titel: "Roomy Raumbelegung",
    beschreibung: "Echtzeit-Anzeige der aktuellen Raumauslastung (belegt/ frei) über Webex-Sensoren und Darstellung der geplanten Outlook-Kalendertermine pro Raum mit Zeitraum und Organisator.                   ***** Aus Datenschutzgründen wurden echte Daten durch Beispielwerte ersetzt.*****",
    fokus: "IoT - Kalender-Integration",
    stack: ["Python", "Flask", "Webex Sensoren Integration", "Microsoft Graph API - für Termine aus Outlook", "OAuth2 Client Credentials"],
    link: "#",
    image: roomyImg,
    alt: "Roomy Raumbelegung Dashboard",
  },

  {
    titel: "FinDaily Finanzverwaltung",
    beschreibung: "Verwaltung und Auswertung persoenlicher Finanzen mit interaktiven Dashboards.",
    fokus: "Finance - Dashboards",
    stack: ["ASP.NET Core", "PostgreSQL", "React + Vite", "Chart.js", "GSAP"],
    link: "#",
    image: findailyImg,
    alt: "FinDaily Finanzdashboard",
  },
  
  {
    titel: "Tomitos Productions Portfolio",
    beschreibung: "Web-Portfolio fuer Film- und Videoprojekte mit Fokus auf visuelles Storytelling.",
    fokus: "Media - Interaktion",
    stack: ["Python", "Flask", "Jinja2", "Tailwind CSS", "JavaScript", "GSAP", "ScrollTrigger"],
    link: "https://www.tomitosproductions.com/",
    image: tomitosImg,
    alt: "Tomitos Portfolio Ansicht",
  },
  {
    titel: "Fahrradladen - ERP",
    beschreibung: "ERP - Desktop Anwendung",
    fokus: "Retail - Verwaltung",
    stack: [".Net", "C#", "WPF", "MySQL"],
    link: "#",
    image: fahrradladenImg,
    alt: "Fahrradladen Produktverwaltung UI",
  },
  {
    titel: "Dogs Community Forum",
    beschreibung: "Forum in PHP.",
    fokus: "Web - Forum",
    stack: ["PHP", "MySQL", "HTML"],
    link: "#",
    image: phpImg,
    alt: "Forumoberflaeche",
  },
];
