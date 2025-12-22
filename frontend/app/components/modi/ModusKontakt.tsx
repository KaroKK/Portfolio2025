"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/scenes.css";

type KontaktItem = {
  titel: string;
  link: string;
  href: string;
  meta: string;
  beschreibung: string;
};

const kontaktpunkte: KontaktItem[] = [
  {
    titel: "Mail",
    link: "kuster.karolina@yahoo.com",
    href: "mailto:kuster.karolina@yahoo.com",
    meta: "Schnellster Weg",
    beschreibung: "Kurze Nachricht mit Kontext und ich melde mich meistens innerhalb von 24 Stunden.",
  },
  {
    titel: "LinkedIn",
    link: "linkedin.com/in/karolina",
    href: "https://www.linkedin.com/in/karolina-kuster-ba278b394/",
    meta: "Kurz vernetzen",
    beschreibung: "",
  },
  {
    titel: "GitHub",
    link: "github.com/#",
    href: "https://github.com/#",
    meta: "Proof of work",
    beschreibung: "Aktuelle Projekte, Code.",
  },
  {
    titel: "Standort",
    link: "Berlin (Remote offen)",
    href: "",
    meta: "Zeitzone CET",
    beschreibung: " ",
  },
];

export default function ModusKontakt() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const kartenRefs = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        kartenRefs.current,
        { opacity: 0, y: 16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-card contact-route" ref={containerRef}>
      <div className="contact-hero">
       
        <div className="contact-pills">
          <span className="contact-pill">Antwort meist &lt; 24h</span>
          <span className="contact-pill">Deutsch / English</span>
          <span className="contact-pill">Remote (CET) • Berlin</span>
        </div>
      </div>

      <div className="contact-grid">
        {kontaktpunkte.map((punkt, index) => (
          <a
            key={punkt.titel}
            className="contact-card contact-card--kontakt"
            href={punkt.href}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              if (el) kartenRefs.current[index] = el;
            }}
          >
            <div className="contact-card-head">
              <span className="contact-badge">{punkt.meta}</span>
              <span className="contact-type">{punkt.titel}</span>
            </div>
            <div className="contact-value">{punkt.link}</div>
            <p className="contact-desc">{punkt.beschreibung}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
