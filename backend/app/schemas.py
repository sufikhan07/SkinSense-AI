from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AssessmentRequest(BaseModel):
    skinType: str
    concerns: list[str]
    sensitivity: str
    acneFrequency: str
    rashFrequency: str
    sunscreenUse: str
    age: int


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    skin_type: str | None = None
    sensitivity: str | None = None
    concerns: str | None = None
    age: int | None = None

    class Config:
        from_attributes = True