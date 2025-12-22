"use client";

import React, { useEffect } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/shell.css";
import "../styles/scenes.css";
import { ModusId } from "../types/modi";
import ModusUeberblick from "./modi/ModusUeberblick";
import ModusSkills from "./modi/ModusSkills";
import ModusProjekte from "./modi/ModusProjekte";
import ModusKontakt from "./modi/ModusKontakt";
import { navItems } from "./ModusNavigation";

type ModusBuehneProps = {
  aktiverModus: ModusId;
  markierteSkills: string[];
  onOpenBrain: () => void;
  assistentGeoeffnet: boolean;
  onToggleBrain: () => void;
  onModusChange: (modus: ModusId) => void;
};

const modusMeta: Record<ModusId, { title: string; subline: string }> = {
  ueberblick: {
    title: "About me",
    subline: "Full-Stack Developer & KI-Enthusiastin.",
  },
  skills: {
    title: "Skill Map",
    subline: "Technologien, Frameworks und Tools.",
  },
  projekte: {
    title: "Projekte",
    subline: "See what I've built.",
  },
  kontakt: {
    title: "Kontakt",
    subline: "Lass uns zusammenarbeiten!",
  },
};

export default function ModusBuehne({
  aktiverModus,
  markierteSkills,
  onOpenBrain,
  assistentGeoeffnet,
  onToggleBrain,
  onModusChange,
}: ModusBuehneProps) {
  const rahmenRef = useRef<HTMLDivElement | null>(null);
  const szeneRef = useRef<HTMLDivElement | null>(null);
  const ersteRenderungRef = useRef(true);

  useLayoutEffect(() => {
    const frame = rahmenRef.current;
    const scene = szeneRef.current;
    if (!frame || !scene) return;

    if (ersteRenderungRef.current) {
      ersteRenderungRef.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        frame.querySelector(".stage-header"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
      )
        .fromTo(
          scene,
          { opacity: 0, y: 18, filter: "blur(10px)", rotateX: -6, scale: 0.98, transformOrigin: "50% 6%" },
          { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0, scale: 1, duration: 0.85 },
          "-=0.25"
        )
        .fromTo(
          scene,
          { clipPath: "inset(0 0 26% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power2.out" },
          "<"
        )
        .fromTo(
          ".stage-glow",
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "sine.out" },
          "-=0.55"
        );
    }, frame);

    return () => ctx.revert();
  }, [aktiverModus]);

  useEffect(() => {
    const frame = rahmenRef.current;
    const scene = szeneRef.current;
    if (!frame || !scene) return;
    const glow = frame.querySelector(".stage-glow");
    if (window.innerWidth < 720) return; // Auf kleinen Screens keine Maus-Parallax, um Performance zu schonen

    const bewegeSzene = (event: PointerEvent) => {
      const bounds = frame.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(scene, { x: relX * 8, y: relY * 6, duration: 0.6, ease: "power2.out" });
      if (glow) {
        gsap.to(glow, { x: relX * 18, y: relY * 14, duration: 0.8, ease: "sine.out" });
      }
    };

    const szeneZuruecksetzen = () => {
      gsap.to(scene, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
      if (glow) {
        gsap.to(glow, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
      }
    };

    frame.addEventListener("pointermove", bewegeSzene);
    frame.addEventListener("pointerleave", szeneZuruecksetzen);

    return () => {
      frame.removeEventListener("pointermove", bewegeSzene);
      frame.removeEventListener("pointerleave", szeneZuruecksetzen);
    };
  }, []);

  let inhalt: React.ReactElement | null = null;
  if (aktiverModus === "ueberblick") inhalt = <ModusUeberblick onOpenBrain={onOpenBrain} />;
  if (aktiverModus === "skills") inhalt = <ModusSkills markierteSkills={markierteSkills} onOpenBrain={onOpenBrain} />;
  if (aktiverModus === "projekte") inhalt = <ModusProjekte onOpenBrain={onOpenBrain} />;
  if (aktiverModus === "kontakt") inhalt = <ModusKontakt />;

  return (
    <div className={`stage-area ${assistentGeoeffnet ? "with-brain" : ""}`}>
      <div className="stage-frame" ref={rahmenRef}>
        <div className="stage-header">
          <div className="stage-title">
            <span className="soft-pill">Modus</span>
            <div>
              <h1>{modusMeta[aktiverModus].title}</h1>
              <div className="stage-subline">{modusMeta[aktiverModus].subline}</div>
            </div>
          </div>

          <div className="header-mobile-actions">
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`mobile-nav-btn ${aktiverModus === item.id ? "active" : ""}`}
                  onClick={() => onModusChange(item.id)}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="brain-toggle-mobile"
              onClick={onToggleBrain}
              aria-label={assistentGeoeffnet ? "Assistent schließen" : "Assistent öffnen"}
            >
              {assistentGeoeffnet ? "Assistent aus" : "Assistent an"}
            </button>
          </div>
        </div>

        <div className="stage-body">
          <div className="stage-glow" aria-hidden="true" />
          <div key={aktiverModus} className="scene-scroll" ref={szeneRef}>
            {inhalt}
          </div>
        </div>
      </div>
    </div>
  );
}
