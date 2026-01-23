"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/shell.css";
import "./styles/sidebrain.css";
import KontextAssistent from "./components/KontextAssistent";
import { projekte } from "./data/projects";
import { skillGruppen } from "./data/skills";

const navItems = [
  { label: "Start", href: "#top" },
  { label: "Fakten", href: "#facts" },
  { label: "Projekte", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

const kontaktWege = [
  { label: "Mail", value: "kuster.karolina@yahoo.com", href: "mailto:kuster.karolina@yahoo.com", hint: "Antwort < 24h" },
  { label: "LinkedIn", value: "linkedin.com/", href: "https://www.linkedin.com/in/karolina-kuster-ba278b394/", hint: "Vernetzen" },
  { label: "GitHub", value: "github.com/", href: "https://github.com/karokk", hint: "Code & Projekte" },
];


const fakty = [
  { value: "10+", label: "projekte (web, iot, healthcare)" },
  { value: "3", label: "sprachen: DE / EN / PL" },
  { value: "Berlin", label: "remote / hybrid" },
  { value: "Stack", label: "TypeScript / Python / .NET" },
  { value: "LLM", label: "integrationen + automationen" },
  { value: "CI/CD", label: "tests + deployment" },
];

const podkreslTestkonto = (tekst: string) => {
  const marker = "Testkonto:";
  const indeks = tekst.indexOf(marker);
  if (indeks === -1) return tekst;
  return (
    <>
      {tekst.slice(0, indeks)}
      <span className="notice-highlight">{tekst.slice(indeks)}</span>
    </>
  );
};

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [ausgewaehltesProjekt, setAusgewaehltesProjekt] = useState<(typeof projekte)[number] | null>(null);
  const [markierteSkills, setMarkierteSkills] = useState<string[]>([]);
  const [zeigeAlleSkills] = useState(true);
  const [mobileMenuOffen, setMobileMenuOffen] = useState(false);
  const [scrollTopSichtbar, setScrollTopSichtbar] = useState(false);
  const [cookieSichtbar, setCookieSichtbar] = useState(false);
  const [cookieEinstellungenOffen, setCookieEinstellungenOffen] = useState(false);

  const eindeutigeMarkierungen = useMemo(() => Array.from(new Set(markierteSkills)), [markierteSkills]);
  const sichtbareSkills = (skills: { name: string }[]) => skills;

  useEffect(() => {
    try {
      setCookieSichtbar(!window.localStorage.getItem("kk-cookie-consent"));
    } catch {
      setCookieSichtbar(true);
    }
  }, []);

  useEffect(() => {
    // Scroll-Button erst zeigen, wenn man ein Stück runter ist.
    const onScroll = () => setScrollTopSichtbar(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Wenn das Menü offen ist, soll der Hintergrund stillstehen.
    document.body.style.overflow = mobileMenuOffen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOffen]);

  const speichereCookieAuswahl = (auswahl: "accepted" | "necessary" | "rejected") => {
    try {
      window.localStorage.setItem("kk-cookie-consent", auswahl);
      document.cookie = `kk-cookie-consent=${auswahl}; max-age=31536000; path=/`;
    } catch {
      // Ignore storage errors and just hide the banner.
    }
    setCookieSichtbar(false);
    setCookieEinstellungenOffen(false);
  };

  const akzeptiereCookies = () => speichereCookieAuswahl("accepted");
  const nurNotwendigeCookies = () => speichereCookieAuswahl("necessary");
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Elemente nacheinander einblenden 
      ScrollTrigger.batch("[data-reveal]:not(.project-card)", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12 }
          );
        },
        once: true,
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((shape, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        // Leichte Parallax 
        gsap.to(shape, {
          y: direction * 140,
          x: direction * 80,
          rotate: direction * 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".page-shell",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-media]").forEach((media) => {
        // Medien leicht „hochfahren“
        gsap.fromTo(
          media,
          { scale: 0.96, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: media,
              start: "top 80%",
            },
          }
        );
      });

      const animateProjectCards = (distance: number) => {
        // Mobil: Karten kommen seitlich rein.
        ScrollTrigger.batch(".project-card", {
          start: "top 85%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { x: distance, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.14 }
            );
          },
          once: true,
        });
      };

      mm.add("(min-width: 900px)", () => {
        // Desktop: Projektliste läuft horizontal mit.
        const sekcja = document.querySelector<HTMLElement>("#projects");
        const tor = sekcja?.querySelector<HTMLElement>(".project-reel");
        const liste = sekcja?.querySelector<HTMLElement>(".project-list");
        const track = sekcja?.querySelector<HTMLElement>(".project-track");
        const fill = sekcja?.querySelector<HTMLElement>(".project-track-fill");
        if (!sekcja || !tor || !liste || !track || !fill) return;

        const odleglosc = () => Math.max(0, liste.scrollWidth - tor.clientWidth);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sekcja,
            start: "top top+=0",
            end: () => `+=${odleglosc() * 1.2 + 900}`,
            scrub: 1.4,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        tl.to(liste, { x: () => -odleglosc(), ease: "none" }, 0)
          .fromTo(fill, { scaleX: 0.08 }, { scaleX: 1, ease: "none" }, 0)
          .fromTo(track, { scaleY: 0.7, opacity: 0.7 }, { scaleY: 1, opacity: 1, ease: "none" }, 0);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 899px)", () => {
        animateProjectCards(60);
      });
    }, rootRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div className="page-shell" ref={rootRef}>
      <div className="ambient-layer" aria-hidden="true">
        <span className="float-shape shape-one" data-float />
        <span className="float-shape shape-two" data-float />
        <span className="float-shape shape-three" data-float />
        <span className="float-line shape-four" data-float />
      </div>

      <header className="site-header">
        <div className="logo">
          <div className="logo-mark">KK</div>
          <div className="logo-copy">
            <span className="logo-title">Karolina Kuster</span>
          </div>
        </div>

        <nav className="site-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="menu-toggle" type="button" onClick={() => setMobileMenuOffen(true)} aria-label="Menü öffnen">
            <span />
            <span />
            <span />
          </button>
          <a className="btn primary" href="#contact">
            Kontakt
          </a>
        </div>
      </header>
      <div className={`mobile-menu ${mobileMenuOffen ? "is-open" : ""}`} aria-hidden={!mobileMenuOffen}>
        <div className="mobile-scrim" onClick={() => setMobileMenuOffen(false)} />
        <div className="mobile-panel">
          <div className="mobile-head">
            <div className="logo-mark small">KK</div>
            <button className="icon-btn" type="button" onClick={() => setMobileMenuOffen(false)} aria-label="Menü schließen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6 18 18M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOffen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-actions">
            <a className="btn primary" href="#contact" onClick={() => setMobileMenuOffen(false)}>
              Kontakt
            </a>
          </div>
        </div>
      </div>

      <main className="content">
        <div className="layout-grid">
          <div className="main-column">
            <section className="hero" id="top">
              <div className="hero-main">
                <p className="eyebrow" data-reveal>Full-stack & AI</p>
                <h1 className="hero-title" data-reveal>Gebaut für den Alltag, nicht für Folien.</h1>
                <p className="hero-lede" data-reveal>
                  Discovery in Tagen, Delivery in Wochen. Fokus auf Performance und klare Architektur.
                </p>
                <div className="hero-actions" data-reveal>
                  <a className="btn primary" href="#projects">
                    Projekte ansehen
                  </a>
                 
                </div>
              </div>

              <div className="hero-panel">
                <div className="hero-card" data-reveal>
                  <div className="hero-card-top">
                    <span className="eyebrow">Letzter Case</span>
                    <span className="capsule accent">Healthcare</span>
                  </div>
                  <h3>Healthcare DICOM Prüftool</h3>
                  <p>Technische Tests für PACS/RIS mit Python, Flask, LDAP-Login und DICOM-Workflows.</p>
                  <div className="tag-row">
                    <span>Python</span>
                    <span>Flask</span>
                    <span>pynetdicom</span>
                    <span>Automated Tests</span>
                  </div>
                </div>

                <div className="hero-card" data-reveal>
                  <p className="eyebrow">Wie ich arbeite</p>
                  <h3>Ich entwickle Frontend und Backend so, dass alles Hand in Hand funktioniert.</h3>
                  <p>Ich bringe Klarheit in Anforderungen, schreibe verständlichen Code und setze auf Lösungen, die man auch im Alltag noch versteht.</p>
                  <div className="tag-row">
                    <span>Frontend</span>
                    <span>Backend</span>
                    <span>Automation</span>
                  </div>
                </div>

                
              </div>
            </section>

            <section className="section-block" id="facts">
              <div className="section-heading">
                <span className="section-index">01</span>
                <div>
                  <p className="section-eyebrow">Fakten</p>
                  <h2 className="section-title">Kurz und konkret</h2>
                </div>
              </div>
              <div className="facts-grid">
                {fakty.map((fakt) => (
                  <article key={fakt.value + fakt.label} className="fact-card" data-reveal>
                    <div className="fact-value">{fakt.value}</div>
                    <div className="fact-label">{fakt.label}</div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-block" id="projects">
              <div className="section-heading">
                <span className="section-index">02</span>
                <div>
                  <p className="section-eyebrow">Projekte</p>
                  <h2 className="section-title">Meine Arbeiten</h2>
                </div>
              </div>
              <div className="project-reel">
                <div className="project-track" aria-hidden="true">
                  <span className="project-track-fill" />
                </div>
                <div className="project-list">
                  {projekte.map((projekt, index) => {
                    const nummer = String(index + 1).padStart(2, "0");
                    return (
                      <article key={projekt.titel} className="project-card" data-reveal>
                        <div className="project-media" onClick={() => setAusgewaehltesProjekt(projekt)}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {projekt.media.type === "image" ? (
                            <img src={projekt.media.src.src} alt={projekt.alt} loading="lazy" data-media />
                          ) : (
                            <video
                              src={projekt.media.src}
                              muted
                              loop
                              playsInline
                              autoPlay
                              data-media
                            />
                          )}
                          <span className="project-focus">{projekt.fokus}</span>
                        </div>
                        <div className="project-info">
                          <div className="project-top">
                            <h3 className="project-title">{projekt.titel}</h3>
                            <span className="project-index">{nummer}</span>
                          </div>
                          <p>{podkreslTestkonto(projekt.beschreibung)}</p>
                          <div className="tag-row">
                            {projekt.stack.slice(0, 4).map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                          <div className="project-actions">
                            <a className="btn ghost small" href={projekt.link} target="_blank" rel="noreferrer">
                              Zum Projekt
                            </a>
                            <button className="btn link" type="button" onClick={() => setAusgewaehltesProjekt(projekt)}>
                              Details
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="section-block" id="skills">
              <div className="section-heading">
                <span className="section-index">03</span>
                <div>
                  <p className="section-eyebrow">Skillmap</p>
                  <h2 className="section-title">Stack & Schwerpunkte</h2>
                </div>
                <span className="capsule subtle">Assistent markiert passende Skills</span>
              </div>

              
              <div className={`skills-grid ${zeigeAlleSkills ? "is-expanded" : ""}`}>
                {skillGruppen.map((gruppe) => (
                  <article key={gruppe.id} className="skill-card" data-reveal>
                    <div className="skill-head">
                      <h3>{gruppe.titel}</h3>
                      <p>{gruppe.beschreibung}</p>
                    </div>
                    <div className="skill-tags">
                      {sichtbareSkills(gruppe.skills).map((skill) => {
                        const markiert = eindeutigeMarkierungen.includes(skill.name);
                        return (
                          <span key={skill.name} className={markiert ? "is-hit" : ""}>
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>

            </section>

            <section className="section-block" id="contact">
              <div className="section-heading">
                <span className="section-index">04</span>
                <div>
                  <p className="section-eyebrow">Kontakt</p>
                  <h2 className="section-title">Lass uns sprechen</h2>
                </div>
              </div>
              <div className="contact-grid">
                {kontaktWege.map((kontakt) => (
                  <a key={kontakt.label} href={kontakt.href} className="contact-card" target="_blank" rel="noreferrer" data-reveal>
                    <span className="capsule subtle">{kontakt.hint}</span>
                    <h3>{kontakt.label}</h3>
                    <p>{kontakt.value}</p>
                  </a>
                ))}
              </div>
            </section>

          </div>

          <aside className="assistant-column" id="assistant" data-reveal>
            <KontextAssistent
              open={true}
              introReady={true}
              aktiverModus="ueberblick"
              onToggle={() => { }}
              onHighlightSkills={setMarkierteSkills}
              showToggle={false}
            />
          </aside>
        </div>
      </main>
      <footer className="footer footer-band">
        <div className="footer-band-inner">
          <span>@Karolina Kuster 2026</span>
          <div className="footer-links">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </footer>
      <button
        className={`scroll-top ${scrollTopSichtbar ? "is-visible" : ""}`}
        type="button"
        aria-label="Zurück nach oben"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 19V5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m6 11 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {ausgewaehltesProjekt && (
        <div className="project-modal" role="dialog" aria-modal="true" onClick={() => setAusgewaehltesProjekt(null)}>
          <div className="project-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="project-modal-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {ausgewaehltesProjekt.media.type === "image" ? (
                <img src={ausgewaehltesProjekt.media.src.src} alt={ausgewaehltesProjekt.alt} />
              ) : (
                <video
                  src={ausgewaehltesProjekt.media.src}
                  poster={ausgewaehltesProjekt.media.poster?.src}
                  controls
                  playsInline
                />
              )}
            </div>
            <div className="project-modal-content">
              <span className="capsule subtle">{ausgewaehltesProjekt.fokus}</span>
              <h3>{ausgewaehltesProjekt.titel}</h3>
              <p>{podkreslTestkonto(ausgewaehltesProjekt.beschreibung)}</p>
              <div className="tag-row">
                {ausgewaehltesProjekt.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-actions">
                <a className="btn ghost" href={ausgewaehltesProjekt.link} target="_blank" rel="noreferrer">
                  Zum Projekt
                </a>
                <button className="btn primary" type="button" onClick={() => setAusgewaehltesProjekt(null)}>
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`cookie-banner ${cookieSichtbar ? "is-visible" : ""}`} role="region" aria-label="Cookie Hinweis">
        <div className={`cookie-card ${cookieEinstellungenOffen ? "is-expanded" : ""}`}>
          <div className="cookie-main">
            <p className="cookie-title">Cookie-Einstellungen</p>
            <p className="cookie-copy">
              Wir verwenden technisch notwendige Cookies, um deine Auswahl zu speichern. Keine Tracking- oder Marketing-Cookies.
            </p>
            <div className="cookie-links">
              <a href="/datenschutz">Datenschutz</a>
              <a href="/cookies">Cookie-Richtlinie</a>
            </div>
          </div>
          <div className="cookie-actions">
            <button className="btn ghost small" type="button" onClick={nurNotwendigeCookies}>
              Nur notwendige
            </button>
            <button className="btn primary small" type="button" onClick={akzeptiereCookies}>
              Alle akzeptieren
            </button>
            <button
              className="btn link small"
              type="button"
              onClick={() => setCookieEinstellungenOffen((prev) => !prev)}
            >
              {cookieEinstellungenOffen ? "Details ausblenden" : "Details anzeigen"}
            </button>
          </div>
          {cookieEinstellungenOffen && (
            <div className="cookie-details">
              <div className="cookie-detail-row">
                <span>Verantwortliche</span>
                <span>Karolina Kuster</span>
              </div>
              <div className="cookie-detail-row">
                <span>Rechtsgrundlage</span>
                <span>Art. 6 Abs. 1 lit. a und lit. f DSGVO</span>
              </div>
              <div className="cookie-detail-row">
                <span>Cookie</span>
                <span>kk-cookie-consent (12 Monate, Erstanbieter)</span>
              </div>
              <div className="cookie-detail-row">
                <span>Optionale Cookies</span>
                <span>Keine derzeit aktiv.</span>
              </div>
              <div className="cookie-detail-row">
                <span>Widerspruch</span>
                <span>Du kannst deine Auswahl jederzeit in den Cookie-Einstellungen ändern.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
