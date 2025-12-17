"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import "../../styles/scenes.css";
import { projekte } from "../../data/projects";
import type { Projekt } from "../../data/projects";
import gsap from "gsap";

type ModusProjekteProps = {
  onOpenBrain: () => void;
};

export default function ModusProjekte({ onOpenBrain }: ModusProjekteProps) {
  const [offenesProjekt, setOffenesProjekt] = useState<Projekt | null>(null);
  const [isClient, setIsClient] = useState(false);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  void onOpenBrain;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 18,
        rotateX: -5,
        transformOrigin: "50% 100%",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOffenesProjekt(null);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useLayoutEffect(() => {
    if (!offenesProjekt) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-modal-body",
        { opacity: 0, y: 18, scale: 0.97, filter: "blur(6px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, [offenesProjekt]);

  const handleCardMove = (event: React.MouseEvent, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: relX * 8,
      rotationX: -relY * 6,
      y: relY * 6,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const resetCard = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { rotationY: 0, rotationX: 0, y: 0, duration: 0.6, ease: "power3.out" });
  };

  const modalContent =
    offenesProjekt && (
      <div className="project-modal" role="dialog" aria-modal="true" onClick={() => setOffenesProjekt(null)}>
        <div
          className="project-modal-body"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="project-modal-img">
            <Image
              src={offenesProjekt.image}
              alt={offenesProjekt.alt}
              fill
              sizes="95vw"
              className="project-thumb-img"
              priority
            />
          </div>
          <div className="project-modal-meta">
            <div className="project-focus">{offenesProjekt.fokus}</div>
            <h3 className="project-title">{offenesProjekt.titel}</h3>
            <p className="fact-line">{offenesProjekt.beschreibung}</p>
            <div className="project-stack">
              {offenesProjekt.stack.map((tech) => (
                <span key={tech} className="stack-pill">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-modal-actions">
              <a className="action-btn" href={offenesProjekt.link} target="_blank" rel="noreferrer">
                Zum Projekt
              </a>
              <button className="project-close-btn" type="button" onClick={() => setOffenesProjekt(null)}>
                Schliessen
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="scene-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
               
      </div>

      <div className="scene-grid" ref={gridRef}>
        {projekte.map((projekt, index) => (
          <a
            key={projekt.titel}
            className="project-card"
            href={projekt.link}
            target="_blank"
            rel="noreferrer"
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            onMouseMove={(event) => handleCardMove(event, index)}
            onMouseLeave={() => resetCard(index)}
          >
            <div
              className="project-thumb"
              onClick={(event) => {
                event.preventDefault();
                setOffenesProjekt(projekt);
              }}
            >
              <Image
                src={projekt.image}
                alt={projekt.alt}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="project-thumb-img"
                priority={false}
              />
              <span
                className="project-zoom-btn"
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.preventDefault();
                  setOffenesProjekt(projekt);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setOffenesProjekt(projekt);
                  }
                }}
              >
                Vergoessern
              </span>
            </div>
            <div className="project-focus">{projekt.fokus}</div>
            <h3 className="project-title">{projekt.titel}</h3>
            <p className="fact-line">{projekt.beschreibung}</p>
            <div className="project-stack">
              {projekt.stack.map((tech) => (
                <span key={tech} className="stack-pill">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {isClient && modalContent ? createPortal(modalContent, document.body) : null}
    </div>
  );
}
