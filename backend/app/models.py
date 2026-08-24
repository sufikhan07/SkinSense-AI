from sqlalchemy import Column, Integer, String, Text

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False,
    )

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
    )

    skin_type = Column(
        String(50),
        nullable=True,
    )

    sensitivity = Column(
        String(50),
        nullable=True,
    )

    concerns = Column(
        Text,
        nullable=True,
    )

    age = Column(
        Integer,
        nullable=True,
    )