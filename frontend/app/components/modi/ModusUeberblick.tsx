"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/scenes.css";

type UeberblickProps = {
  onOpenBrain: () => void;
};

export default function ModusUeberblick({ onOpenBrain }: UeberblickProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ersteDarstellungRef = useRef(true);

  useLayoutEffect(() => {
    if (ersteDarstellungRef.current) {
      ersteDarstellungRef.current = false;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(".overview-block", {
        opacity: 0,
        y: 8,
        filter: "blur(4px)",
        duration: 0.38,
        ease: "power2.out",
        stagger: 0.04,
      });

      gsap.from(".overview-side", {
        opacity: 0,
        x: 10,
        duration: 0.32,
        ease: "power2.out",
        delay: 0.02,
      });

      gsap.from(".glow-band span", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "sine.out",
        stagger: 0.08,
        delay: 0.08,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-card overview-layout" ref={containerRef}>
      <div className="overview-main">
        <div className="overview-block signal-card">
          <div className="signal-dot" />
          <span className="accent">
            <h3>Wie ich denke</h3>
          </span>
          <p className="fact-line">
            Ich arbeite strukturiert und neugierig. Wenn ich mich mit einem Thema beschäftige, möchte ich es wirklich
            verstehen, nicht nur oberflächlich, sondern im Zusammenhang. In kurzer Zeit habe ich mir breites technisches
            Verständnis aufgebaut, weil ich neue Technologien aktiv ausprobiere und gerne dazulerne.
          </p>
        </div>

        <div className="overview-block signal-card">
          <div className="signal-dot" />
          <span className="accent">
            <h3>Was ich mache</h3>
          </span>
          <p className="fact-line">
            Ich entwickle Webanwendungen mit Fokus auf klare Logik, gute Struktur und sinnvolle Schnittstellen. Besonders gerne
            arbeite ich an Projekten, bei denen Systeme zusammenkommen oder Prozesse automatisiert werden können. Es motiviert
            mich, mich in neue Themen einzuarbeiten und Schritt für Schritt funktionierende Lösungen zu bauen.
          </p>
        </div>

        <div className="overview-block signal-card">
          <div className="signal-dot" />
          <span className="accent">
            <h3>Was mich interessiert</h3>
          </span>
          <p className="fact-line">
            KI-basierte Anwendungen, LLMs und GenAI in der Praxis, vor allem dort, wo sie echten Mehrwert bringen. Healthcare-IT
            finde ich spannend, besonders aus Sicht der Softwareentwicklung und der Automatisierung von Abläufen. Durch
            praktische Einblicke in reale Prozesse hat sich dieses Interesse weiter vertieft.
          </p>
        </div>
      </div>

      <div className="overview-side signal-card">
        <div className="signal-dot" />
        <span className="accent">
          <h3>Fokus</h3>
        </span>
        <div className="interest-pills">
          <span className="stack-pill">LLMs & GenAI</span>
          <span className="stack-pill">Healthcare-IT</span>
          <span className="stack-pill">Prozessautomatisierung</span>
        </div>
      </div>
    </div>
  );
}
