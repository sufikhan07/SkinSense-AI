from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import schemas
from .auth import (
    create_access_token,
    hash_password,
    verify_password,
)
from .database import Base, engine, get_db
from .models import User
from .recommender import generate_recommendation


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="SkinSense API",
    description="Personalized skincare recommendation API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "SkinSense API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/api/auth/register")
def register(
    user_data: schemas.RegisterRequest,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists.",
        )

    if len(user_data.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 6 characters.",
        )

    user = User(
        name=user_data.name,
        email=user_data.email.lower(),
        hashed_password=hash_password(
            user_data.password
        ),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
        }
    )

    return {
        "message": "Account created successfully.",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "skin_type": user.skin_type,
            "sensitivity": user.sensitivity,
            "concerns": user.concerns,
            "age": user.age,
        },
    }


@app.post("/api/auth/login")
def login(
    login_data: schemas.LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.email
            == login_data.email.lower()
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    if not verify_password(
        login_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
        }
    )

    return {
        "message": "Login successful.",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "skin_type": user.skin_type,
            "sensitivity": user.sensitivity,
            "concerns": user.concerns,
            "age": user.age,
        },
    }


@app.post("/api/assessment")
def analyze_skin(
    assessment: schemas.AssessmentRequest,
):
    analysis = generate_recommendation(
        assessment.skinType,
        assessment.concerns,
        assessment.sensitivity,
        assessment.acneFrequency,
        assessment.rashFrequency,
        assessment.sunscreenUse,
        assessment.age,
    )

    return {
        "success": True,
        "assessment": assessment,
        "analysis": analysis,
    }