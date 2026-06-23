"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Property {
  id: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function PropertyMap({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <MapContainer
      center={[25.2677, 82.9913]}
      zoom={13}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties
        .filter(
          (p) =>
            p.latitude &&
            p.longitude
        )
        .map((property) => (
          <Marker
            key={property.id}
            position={[
              property.latitude,
              property.longitude,
            ]}
          >
            <Popup>
              <div>
                <h3>
                  {property.title}
                </h3>

                <p>
                  {property.address}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}