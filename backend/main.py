from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Lead
from schemas import LeadCreate

from chatbot import ask_ai
from email_service import send_email_notification

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://YOUR-VERCEL-URL.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "AI Business Assistant Running"}

@app.post("/chat")
def chat(data: dict):

    question = data.get("message")

    answer = ask_ai(question)

    return {"response": answer}

@app.post("/lead")
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db)
):

    new_lead = Lead(
        name=lead.name,
        email=lead.email,
        phone=lead.phone,
        interest=lead.interest
    )

    db.add(new_lead)

    db.commit()

    db.refresh(new_lead)

    send_email_notification(new_lead)

    return {
        "message": "Lead saved successfully"
    }

@app.get("/leads")
def get_leads(db: Session = Depends(get_db)):

    leads = db.query(Lead).all()

    return leads