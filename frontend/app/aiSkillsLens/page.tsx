"use client";

import React, { useState } from "react";
import gsap from "gsap";

export default function SkillLensSeite() {

  const [eingabeText, setEingabeText] = useState("");
  const [ergebnisText, setErgebnisText] = useState("");

  async function analyseStarten() {
    gsap.to(".analyseBlock", { opacity: 0, duration: 0.3 });

    const daten = { text: eingabeText };

    const antwort = await fetch(
  "https://portfoliokuster-backend.up.railway.app/aiSkillsLens",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(daten),
  }
);

    const resultat = await antwort.json();
    setErgebnisText(resultat.analyse);

    gsap.to(".analyseBlock", { opacity: 1, duration: 0.4 });
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
         
      </h1>

      <textarea
        style={{ width: "100%", height: "180px", marginTop: "20px" }}
        onChange={(e) => setEingabeText(e.target.value)}
        placeholder="Stellenanzeige oder Projektbeschreibung einfügen..."
      />

      <button
        onClick={analyseStarten}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          cursor: "pointer"
        }}
      >
        Analysieren
      </button>

      <div className="analyseBlock" style={{ marginTop: "30px", opacity: 1 }}>
        {ergebnisText}
      </div>
    </div>
  );
}
