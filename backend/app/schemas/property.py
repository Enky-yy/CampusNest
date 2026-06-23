from pydantic import BaseModel


class PropertyCreate(BaseModel):
    title: str
    description: str
    rent: float
    address: str

    wifi: bool = False
    food: bool = False
    ac: bool = False
    laundry: bool = False
    image_url: str | None = None
    


class PropertyResponse(PropertyCreate):
    id: int
    owner_id: int
    image_url: str | None = None
    latitude: float | None = None
    longitude: float | None = None

    class Config:
        from_attributes = True