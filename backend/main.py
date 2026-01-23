import os
import time
from typing import Optional

import fastapi
import openai
import pydantic
from fastapi import HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI()

# Whitelist: nur Skills, die wir wirklich nennen dürrfen.
SKILL_WHITELIST = [
    "C#",
    "JavaScript",
    "TypeScript",
    "Python",
    "HTML",
    "CSS",
    "JSON",
    "YAML",
    "Next.js",
    "React",
    "GSAP",
    "FastAPI",
    "Flask",
    "Bootstrap",
    "Tailwind CSS",
    "MySQL",
    "PostgreSQL",
    ".NET",
    "Agile",
    "REST API",
    "OAuth2",
    "Client Credentials",
    "Authorization Code",
    "Docker",
    "Docker Compose",
    "Nginx",
    "CI/CD",
    "Prometheus",
    "Grafana",
    "Hetzner",
    "Git",
    "DICOM",
    "pynetdicom",
    "Webex Sensoren",
    "Azure Logic Apps",
    "OpenAI API",
    "LLM",
    "GenAI",
]

PROJEKT_INFO = """
- Dicognose - Prueftool fuer DICOM: Backend Python/Flask, REST, LDAP Login, DICOM Tests (C-STORE, C-FIND) mit pynetdicom, pandas Excel-Import, SQLite; Frontend HTML/CSS/JS.
- Roomy - Raumbelegung: Backend Python/Flask, JSON-API, Webex Room Sensoren, Microsoft Graph API (getSchedule) via OAuth2 Client Credentials; Frontend HTML/CSS/JS.
- FinDaily - Finanzverwaltung: Backend ASP.NET Core (C#), PostgreSQL; Frontend React mit Chart.js, GSAP.
- TandemFinder - Matching-Plattform: Backend Python/Flask, SQLAlchemy, Swipe/Match-Logik; Frontend HTML/CSS (Tailwind), JS.
- Tomitos Productions Portfolio: Backend Python/Flask/Jinja2, Projekt-Daten dynamisch; Frontend HTML/CSS/JS, Tailwind, GSAP, ScrollTrigger, YouTube-Modal, Filter.
"""

# Kleine Schutz gegen Spam.
RATE_LIMIT = 3  # max requests pro IP
RATE_WINDOW = 20.0  # Sekunden
_REQUEST_LOG: dict[str, list[float]] = {}
ALLOWED_IPS = {"127.0.0.1", "::1"}


def init_openai_client() -> Optional[openai.OpenAI]:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Fehler: OPENAI_API_KEY ist nicht gesetzt.")
        return None
    return openai.OpenAI(api_key=api_key)


openaiClient = init_openai_client()

origins = os.getenv(
    "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyseDaten(pydantic.BaseModel):
    text: str


@app.post("/aiSkillsLens")
def analyse_daten(daten: AnalyseDaten, request: Request):
    if openaiClient is None:
        raise HTTPException(
            status_code=503, detail="OpenAI Service nicht verfuegbar. API Key fehlt."
        )

    ip = request.client.host if request.client else "unknown"

    jetzt = time.time()
    bucket = _REQUEST_LOG.get(ip, [])
    bucket = [ts for ts in bucket if jetzt - ts < RATE_WINDOW]
    if len(bucket) >= RATE_LIMIT:
        # Zu viele Anfragen in kurzer Zeit.
        raise HTTPException(
            status_code=429,
            detail="Zu viele Anfragen von dieser IP. Bitte kurz warten.",
        )
    bucket.append(jetzt)
    _REQUEST_LOG[ip] = bucket

    # Prompt eng halten, die Antworten konsistent bleiben.
    prompt_text = f"""
Analysiere den Text (Stelle oder Skills) fuer Karolina Kuster.
Schreibe in Ich-Form, kurz, ohne Floskeln oder ausgeschmueckte Adjektive.
Ich habe einige Jahre Praxis, eine Ausbildung zur Fachinformatikerin Anwendungsentwicklung, ein Praktikum an der Charite Berlin (Projekte Dicognose und Roomy) und habe privat frueh entwickelt. Fokus: KI/LLM/GenAI, Integrationen, Automatisierung, Healthcare IT.
Nutze nur diese Skills, wenn sie im Text vorkommen: {', '.join(SKILL_WHITELIST)}.
Nutze nur diese Projekte als Referenz:
{PROJEKT_INFO}
Antwort als Markdown-Liste:
- Staerken: bis zu 3 Punkte, je 1 kurzer Satz, nur wenn im Text angefragt.
- Projekte: bis zu 3 Punkte, Format: 'Projektname — Stack: ... | Rolle/Ergebnis: ...'. Waehle Projekte, deren Stack zu den gefragten Skills passt.
- Abschluss: 1 sehr kurzer Satz zum Fit.
Keine Scores, keine Prozentangaben, keine Jahreszahlen, keine Behauptungen ausserhalb Whitelist/Projekte.
Text:
{daten.text}
"""

    try:
        antwort = openaiClient.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt_text}],
        )
        ergebnis = antwort.choices[0].message.content
        return {"analyse": ergebnis}
    except openai.APIError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API Fehler: {e.message}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Ein unerwarteter Fehler ist aufgetreten: {e}"
        )
