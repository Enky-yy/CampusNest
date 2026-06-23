import requests

def geocode_address(address):
    try:
        response = requests.get(
            "https://nominatim.openstreetmap.org/search",
            params={
                "q": address,
                "format": "json",
                "limit": 1,
            },
            headers={
                "User-Agent": "CampusNest"
            },
            timeout=10,
        )

        data = response.json()

        if not data:
            return None, None

        return (
            float(data[0]["lat"]),
            float(data[0]["lon"]),
        )

    except Exception as e:
        print("Geocoding Error:", e)
        return None, None