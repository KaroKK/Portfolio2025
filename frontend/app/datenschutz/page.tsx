"use client";

import "../styles/shell.css";
import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="page-shell">
      <main className="content">
        <section className="section-block legal-section">
          <div className="section-heading">
            <span className="section-index">Datenschutz</span>
            <div>
              <p className="section-eyebrow">Datenschutzerklärung</p>
              <h2 className="section-title">Datenschutz</h2>
            </div>
            <Link className="btn ghost small" href="/">
              Zurück zur Startseite
            </Link>
          </div>
          {/* Kartenstruktur */}
          <div className="legal-grid">
            <div className="legal-card">
              <h3>Verantwortliche Stelle</h3>
              <p>Karolina Kuster</p>
              <p>Berlin, Deutschland</p>
              <p>E-Mail: kuster.karolina@yahoo.com</p>
            </div>
            <div className="legal-card">
              <h3>Hosting & Server-Logs</h3>
              <p>
                Diese Website wird bei Railway (railway.app) gehostet. Beim Besuch werden technische Zugriffsdaten
                (z. B. IP-Adresse, Zeitstempel, User-Agent, Referrer) verarbeitet. Die Verarbeitung erfolgt auf Grundlage
                von Art. 6 Abs. 1 lit. f DSGVO zur Sicherstellung des Betriebs.
              </p>
            </div>
                 
            <div className="legal-card">
              <h3>KI-Assistent (OpenAI API)</h3>
              <p>
                Wenn du den KI-Assistenten nutzt, werden deine Eingaben zur Beantwortung der Anfrage in Echtzeit an die
                OpenAI API übermittelt und verarbeitet. 
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung/Kommunikation) bzw. lit. f DSGVO
                (berechtigtes Interesse an der Bereitstellung des Dienstes).
              </p>
            </div>
            <div className="legal-card">
              <h3>Externe Links</h3>
              <p>
                Diese Website enthält Links zu externen Diensten (z. B. LinkedIn, GitHub). Beim Anklicken gelten die
                Datenschutzbestimmungen der jeweiligen Anbieter.
              </p>
            </div>
            <div className="legal-card">
              <h3>Deine Rechte</h3>
              <p>
                Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch
                sowie Datenübertragbarkeit (Art. 15?20 DSGVO). Außerdem kannst du eine Einwilligung jederzeit widerrufen.
              </p>
            </div>
            <div className="legal-card">
              <h3>Beschwerderecht</h3>
              <p>
                Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), z. B. bei der
                Behörde deines Wohnorts.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
