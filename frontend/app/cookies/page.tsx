"use client";

import "../styles/shell.css";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="page-shell">
      <main className="content">
        <section className="section-block legal-section">
          <div className="section-heading">
            <span className="section-index">Cookies</span>
            <div>
              <p className="section-eyebrow">Cookie-Richtlinie</p>
              <h2 className="section-title">Cookies</h2>
            </div>
            <Link className="btn ghost small" href="/">
              Zurück zur Startseite
            </Link>
          </div>
          <div className="legal-grid">
            <div className="legal-card">
              <h3>Aktuell verwendete Cookies</h3>
              <div className="legal-table">
                <div className="legal-table-row">
                  <span>Cookie-Name</span>
                  <span>kk-cookie-consent</span>
                </div>
                <div className="legal-table-row">
                  <span>Zweck</span>
                  <span>Speichert deine Auswahl zur Cookie-Einwilligung.</span>
                </div>
                <div className="legal-table-row">
                  <span>Speicherdauer</span>
                  <span>12 Monate</span>
                </div>
                <div className="legal-table-row">
                  <span>Anbieter</span>
                  <span>Erstanbieter (diese Website)</span>
                </div>
              </div>
            </div>
            <div className="legal-card">
              <h3>Optionale Cookies</h3>
              <p>Derzeit werden keine Analyse- oder Marketing-Cookies eingesetzt.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
