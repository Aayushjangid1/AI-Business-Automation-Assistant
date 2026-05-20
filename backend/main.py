from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Lead
from schemas import LeadCreate

from chatbot import ask_ai
from email_service import send_email_notification

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# ✅ FIXED CORS CONFIG (IMPORTANT FOR RENDER)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"  # for development
    ],
    allow_credentials=False,  # 🔥 CRITICAL FIX (fixes OPTIONS 400 issue)
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Home Route
@app.get("/")
def home():
    return {"message": "AI Business Assistant Running"}

# AI Chat Route
@app.post("/chat")
def chat(data: dict):
    question = data.get("message")
    answer = ask_ai(question)
    return {"response": answer}

# Lead Submission Route
@app.post("/lead")
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):

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

    return {"message": "Lead saved successfully"}

# Get All Leads Route
@app.get("/leads")
def get_leads(db: Session = Depends(get_db)):
    return db.query(Lead).all()