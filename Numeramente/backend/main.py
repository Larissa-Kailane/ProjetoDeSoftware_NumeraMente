# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # Permite que o React acesse o backend Python
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/")
# def inicio():
#     return {"mensagem": "Backend do Numeramente funcionando!"}




from datetime import datetime, timezone
from pathlib import Path
import hashlib
import sqlite3

from fastapi import FastAPI, HTTPException, Request, Response
from pydantic import BaseModel

app = FastAPI(title="Painel Termos de Uso do Numeramente")

TERMS_DIR = Path("termos")
CURRENT_VERSION = "v1"  # versão vigente


# ---------- Banco (SQLite para começar) ----------
def get_db():
    conn = sqlite3.connect("app.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS acceptances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            version TEXT NOT NULL,
            content_hash TEXT NOT NULL,
            accepted_at TEXT NOT NULL,
            ip TEXT
        )
    """)
    return conn


# ---------- Helpers ----------
def load_terms(version: str) -> str:
    path = TERMS_DIR / f"{version}.md"
    if not path.is_file() or not path.resolve().is_relative_to(TERMS_DIR.resolve()):
        raise HTTPException(404, "Versão dos termos não encontrada. confira se vc digitou a versao corretamente (sem a extensao .md)")
    return path.read_text(encoding="utf-8")


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


# ---------- Endpoints ----------
@app.get("/terms")
def get_current_terms(response: Response):
    content = load_terms(CURRENT_VERSION)
    h = sha256(content)
    response.headers["ETag"] = h
    response.headers["Cache-Control"] = "public, max-age=3600"
    return {"version": CURRENT_VERSION, "hash": h, "content": content}


@app.get("/terms/{version}")
def get_terms_version(version: str):
    content = load_terms(version)
    return {"version": version, "hash": sha256(content), "content": content}


class AcceptIn(BaseModel):
    user_id: str
    version: str


@app.post("/terms/accept", status_code=201)
def accept_terms(body: AcceptIn, request: Request):
    content = load_terms(body.version)
    with get_db() as db:
        db.execute(
            "INSERT INTO acceptances (user_id, version, content_hash, accepted_at, ip) "
            "VALUES (?, ?, ?, ?, ?)",
            (
                body.user_id,
                body.version,
                sha256(content),
                datetime.now(timezone.utc).isoformat(),
                request.client.host if request.client else None,
            ),
        )
    return {"status": "accepted", "version": body.version}


@app.get("/terms/status/{user_id}")
def acceptance_statussss(user_id: str):
    with get_db() as db:
        row = db.execute(
            "SELECT 1 FROM acceptances WHERE user_id = ? AND version = ?",
            (user_id, CURRENT_VERSION),
        ).fetchone()
    return {"current_version": CURRENT_VERSION, "accepted": row is not None}