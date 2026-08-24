from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import schemas
from .database import Base, engine, get_db
from .models import User
from .auth import hash_password, verify_password, create_access_token
from .recommender import generate_recommendation


app = FastAPI(
    title="SkinSense AI API",
    description="API for personalized skincare recommendations",
    version="1.0.0",
)
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "SkinSense AI API is running"}


@app.post("/api/assessment")
def analyze_skin(assessment: schemas.AssessmentRequest):
    recommendations = generate_recommendation(
        assessment.skinType,
        assessment.concern,
        assessment.sensitivity,
    )

    return {
        "success": True,
        "assessment": assessment,
        "recommendations": recommendations,
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

    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
    })

    return {
        "message": "Account created successfully.",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }


@app.post("/api/auth/login")
def login(
    login_data: schemas.LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == login_data.email)
        .first()
    )

    if not user or not verify_password(
        login_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
    })

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