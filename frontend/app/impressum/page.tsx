"use client";

import "../styles/shell.css";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="page-shell">
      <main className="content">
        <section className="section-block legal-section">
          <div className="section-heading">
            <span className="section-index">Impressum</span>
            <div>
              <p className="section-eyebrow">Angaben gemäß 5 TMG</p>
              <h2 className="section-title">Impressum</h2>
            </div>
            <Link className="btn ghost small" href="/">
              Zurück zur Startseite
            </Link>
          </div>
          <div className="legal-grid">
            <div className="legal-card">
              <h3>Verantwortliche Person</h3>
              <p>Karolina Kuster</p>
              <p>Berlin, Deutschland</p>
              <p>E-Mail: kuster.karolina@yahoo.com</p>
            </div>
            <div className="legal-card">
              <h3>Inhaltlich Verantwortlich</h3>
              <p>Karolina Kuster, Berlin.</p>
              <p>Verantwortlich gemäß 18 Abs. 2 MStV.</p>
            </div>
            <div className="legal-card">
              <h3>Hosting</h3>
              <p>Diese Website wird bei Railway gehostet.</p>
              <p>Railway (railway.app)</p>
            </div>
            <div className="legal-card">
              <h3>Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte nach den allgemeinen
                Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
