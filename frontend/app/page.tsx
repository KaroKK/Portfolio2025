"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "./styles/shell.css";
import "./styles/sidebrain.css";
import ModusNavigation from "./components/ModusNavigation";
import ModusBuehne from "./components/ModusBuehne";
import KontextAssistent from "./components/KontextAssistent";
import { ModusId } from "./types/modi";

const parallaxShapes = [
  { id: "ring-1", className: "parallax-ring", left: "14%", top: "62%", depth: 18 },
  { id: "ring-2", className: "parallax-ring", left: "72%", top: "30%", depth: 20 },
  { id: "ring-3", className: "parallax-ring", left: "46%", top: "44%", depth: 16 },
];

export default function HomePage() {
  const [aktiverModus, setAktiverModus] = useState<ModusId>("ueberblick");
  const [assistentOffen, setAssistentOffen] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [markierteSkills, setMarkierteSkills] = useState<string[]>([]);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Öffne den Assistenten beim ersten Laden 
    setAssistentOffen(true);
  }, []);

  const eindeutigeMarkierungen = useMemo(
    () => Array.from(new Set(markierteSkills)),
    [markierteSkills]
  );

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".bg-mesh", { opacity: 0, scale: 1.01, duration: 0.6, ease: "power2.out" })
        .from(".parallax-floating", { opacity: 0, scale: 0.94, duration: 0.5, stagger: 0.02 }, "-=0.35")
        .from([".left-rail", ".stage-frame"], { opacity: 0, y: 8, duration: 0.35, stagger: 0 }, "-=0.25");
      tl.eventCallback("onComplete", () => setIntroReady(true));
    }, shell);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const layer = parallaxRef.current;
    if (!layer) return;

    const ctx = gsap.context(() => {
      gsap.to(".parallax-floating", {
        y: "+=6",
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { amount: 1.4, from: "random" },
      });
    }, layer);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const layer = parallaxRef.current;
    if (!layer) return;
    const items = Array.from(layer.querySelectorAll<HTMLElement>(".parallax-floating"));
    const movers = items.map((el) => ({
      x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" }),
    }));

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const shiftX = (event.clientX / innerWidth - 0.5) * 24;
      const shiftY = (event.clientY / innerHeight - 0.5) * 18;

      items.forEach((el, index) => {
        const depth = Number(el.dataset.depth ?? "12");
        movers[index].x(shiftX / depth);
        movers[index].y(shiftY / depth);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const wechsleModus = (modus: ModusId) => {
    setAktiverModus(modus);
  };

  const markiereSkills = (skills: string[]) => {
    setMarkierteSkills(skills);
  };

  const oeffneAssistent = () => setAssistentOffen(true);
  const schalteAssistent = () => setAssistentOffen((state) => !state);

  return (
    <div className="page-shell" ref={shellRef}>
      <div className="background-layer" ref={parallaxRef} aria-hidden="true">
        <div className="bg-mesh" />
        <div className="glass-veil" />
        {parallaxShapes.map((shape) => (
          <span
            key={shape.id}
            className={`parallax-floating ${shape.className}`}
            style={{ left: shape.left, top: shape.top }}
            data-depth={shape.depth}
          />
        ))}
      </div>

      <div className="interface-layer">
        <ModusNavigation
          aktiverModus={aktiverModus}
          onModusChange={wechsleModus}
          assistentOffen={assistentOffen}
          onToggleBrain={schalteAssistent}
        />

        <ModusBuehne
          aktiverModus={aktiverModus}
          markierteSkills={eindeutigeMarkierungen}
          onOpenBrain={oeffneAssistent}
          brainOpen={assistentOffen}
        />

        <KontextAssistent
          open={assistentOffen}
          introReady={introReady}
          aktiverModus={aktiverModus}
          onToggle={schalteAssistent}
          onHighlightSkills={markiereSkills}
        />
      </div>
    </div>
  );
}
