from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import schemas
from .auth import (
    create_access_token,
    decode_access_token,
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


def get_current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authentication required.",
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication header.",
        )

    token = authorization.replace("Bearer ", "", 1)

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token.",
        )

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token.",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


@app.post("/api/auth/register")
def register(
    user_data: schemas.RegisterRequest,
    db: Session = Depends(get_db),
):
    email = user_data.email.lower()

    existing_user = (
        db.query(User)
        .filter(User.email == email)
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
        email=email,
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


@app.get("/api/profile")
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "skin_type": current_user.skin_type,
        "sensitivity": current_user.sensitivity,
        "concerns": current_user.concerns,
        "age": current_user.age,
    }


@app.put("/api/profile/assessment")
def save_assessment_profile(
    assessment: schemas.AssessmentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    current_user.skin_type = assessment.skinType
    current_user.sensitivity = assessment.sensitivity
    current_user.concerns = ", ".join(
        assessment.concerns
    )
    current_user.age = assessment.age

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Skin profile updated successfully.",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "skin_type": current_user.skin_type,
            "sensitivity": current_user.sensitivity,
            "concerns": current_user.concerns,
            "age": current_user.age,
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