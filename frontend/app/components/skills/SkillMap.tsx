"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "../../styles/skillmap.css";
import { alleSkillNamen, skillGruppen } from "../../data/skills";

type SkillMapProps = {
  highlightedSkills: string[];
};

const SCALE = 1000;

export default function SkillMap({ highlightedSkills }: SkillMapProps) {
  const [ausgewaehlteGruppe, setAusgewaehlteGruppe] = useState(skillGruppen[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const nodes = useMemo(() => {
    const radius = 0.32;
    const winkelOffset = Math.PI / 12;
    return skillGruppen.map((gruppe, index) => {
      const angle = (index / skillGruppen.length) * Math.PI * 2 - Math.PI / 2 + winkelOffset;
      const x = 0.5 + Math.cos(angle) * radius;
      const y = 0.5 + Math.sin(angle) * radius * 0.78;
      return { ...gruppe, x, y };
    });
  }, []);

  const lines = useMemo(() => {
    const center = { x: 0.5, y: 0.5 };
    const nodeLines = nodes.map((knoten) => ({
      key: `${knoten.id}-center`,
      from: center,
      to: { x: knoten.x, y: knoten.y },
    }));

    const connectors = nodes.map((knoten, index) => {
      const next = nodes[(index + 1) % nodes.length];
      return {
        key: `${knoten.id}-to-${next.id}`,
        from: { x: knoten.x, y: knoten.y },
        to: { x: next.x, y: next.y },
      };
    });

    return [...nodeLines, ...connectors];
  }, [nodes]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-node", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".skill-node", { opacity: 0.55, duration: 0.4, ease: "power2.out" });
      gsap.to(`.skill-node[data-group="${ausgewaehlteGruppe}"]`, {
        opacity: 1,
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [ausgewaehlteGruppe]);

  const gruppeAktuell = skillGruppen.find((gruppe) => gruppe.id === ausgewaehlteGruppe) ?? skillGruppen[0];

  const bereinigteHighlights = highlightedSkills.filter((skill) => alleSkillNamen.includes(skill));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.to(".skill-core", {
        scale: 1.03,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".skill-lines line", {
        opacity: 0.34,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { amount: 1.2, from: "edges" },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !bereinigteHighlights.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-chip.highlight",
        { y: 4, boxShadow: "0 0 0 rgba(255, 155, 95, 0)" },
        {
          y: 0,
          boxShadow: "0 12px 32px rgba(255, 155, 95, 0.2)",
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.05,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [bereinigteHighlights]);

  return (
    <div className="skill-map" ref={containerRef}>
      <div className="skill-map-canvas">
        <svg className="skill-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {lines.map((line) => (
            <line
              key={line.key}
              x1={line.from.x * SCALE}
              y1={line.from.y * SCALE}
              x2={line.to.x * SCALE}
              y2={line.to.y * SCALE}
              stroke="var(--accent)"
              strokeWidth={1}
              opacity={line.key.includes(ausgewaehlteGruppe) ? 0.8 : 0.4}
            />
          ))}
        </svg>

        <div className="skill-core">
          <span>Skill Map</span>
        </div>

        {nodes.map((knoten) => (
          <div
            key={knoten.id}
            className={`skill-node ${ausgewaehlteGruppe === knoten.id ? "active" : ""}`}
            data-group={knoten.id}
            style={{ left: `${knoten.x * 100}%`, top: `${knoten.y * 100}%`, transform: "translate(-50%, -50%)" }}
            onClick={() => setAusgewaehlteGruppe(knoten.id)}
          >
            <div className="label">{knoten.titel}</div>
            <div className="signal">{knoten.beschreibung}</div>
          </div>
        ))}
      </div>

      <div className="skill-details-row">
        <div className="badge" style={{ marginBottom: 8 }}>
          {gruppeAktuell.titel}
        </div>
        <div className="skill-subskills-row">
          {gruppeAktuell.skills.map((skill) => {
            const hervorgehoben = bereinigteHighlights.includes(skill.name);
            return (
              <div key={skill.name} className={`skill-chip ${hervorgehoben ? "highlight" : ""}`}>
                <div>
                  <strong>{skill.name}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
