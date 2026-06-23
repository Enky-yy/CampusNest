from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.property import Property
from app.models.user import User

from app.utils.geocode import geocode_address

from app.schemas.property import (
    PropertyCreate,
    PropertyResponse
)

from app.utils.auth import get_current_user

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)


@router.post("/", response_model=PropertyResponse)
def create_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    lat, lon = geocode_address(
    property_data.address
    )
    print(lat, lon)
    property_obj = Property(
    **property_data.model_dump(),
    owner_id=current_user.id,
    latitude=lat,
    longitude=lon,
    )

    db.add(property_obj)
    db.commit()
    db.refresh(property_obj)

    return property_obj


@router.get("/", response_model=list[PropertyResponse])
def get_properties(
    min_rent: Optional[float] = None,
    max_rent: Optional[float] = None,
    wifi: Optional[bool] = None,
    food: Optional[bool] = None,
    ac: Optional[bool] = None,
    laundry: Optional[bool] = None,
    address: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Property)

    if min_rent is not None:
        query = query.filter(
            Property.rent >= min_rent
        )

    if max_rent is not None:
        query = query.filter(
            Property.rent <= max_rent
        )

    if wifi is not None:
        query = query.filter(
            Property.wifi == wifi
        )

    if food is not None:
        query = query.filter(
            Property.food == food
        )

    if ac is not None:
        query = query.filter(
            Property.ac == ac
        )

    if laundry is not None:
        query = query.filter(
            Property.laundry == laundry
        )

    if address:
        query = query.filter(
            Property.address.ilike(f"%{address}%")
        )

    return query.all()


@router.get("/my", response_model=list[PropertyResponse])
def get_my_properties(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Property)
        .filter(
            Property.owner_id == current_user.id
        )
        .all()
    )


@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(
    property_id: int,
    db: Session = Depends(get_db)
):
    property_obj = (
        db.query(Property)
        .filter(
            Property.id == property_id
        )
        .first()
    )

    if not property_obj:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    return property_obj


@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int,
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    property_obj = (
        db.query(Property)
        .filter(
            Property.id == property_id
        )
        .first()
    )

    if not property_obj:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    if property_obj.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )
    
    if property_obj.address != property_data.address:

        lat, lon = geocode_address(
        property_data.address
        )

        property_obj.latitude = lat
        property_obj.longitude = lon

    for key, value in property_data.model_dump().items():
        setattr(property_obj, key, value)

    db.commit()
    db.refresh(property_obj)

    return property_obj

    
@router.delete("/{property_id}")
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    property_obj = (
        db.query(Property)
        .filter(
            Property.id == property_id
        )
        .first()
    )

    if not property_obj:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    if property_obj.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(property_obj)
    db.commit()

    return {
        "message": "Property deleted successfully"
    }