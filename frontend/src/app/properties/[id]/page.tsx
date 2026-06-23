"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/src/lib/api";

interface Property {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  rent: number;
  address: string;
  wifi: boolean;
  food: boolean;
  ac: boolean;
  laundry: boolean;
  image_url: string;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  async function fetchProperty() {
    try {
      const res = await api.get(`/properties/${params.id}`);

      setProperty(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!property) {
    return <div className="p-6">Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Image */}

        {property.image_url && (
          <div className="mb-8 overflow-hidden rounded-3xl shadow-lg">
            <img
              src={property.image_url}
              alt={property.title}
              className="w-full h-[450px] object-cover"
            />
          </div>
        )}

        {/* Header */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                {property.title}
              </h1>

              <p className="text-slate-500 mt-2 text-lg">
                📍 {property.address}
              </p>
            </div>

            <div>
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl text-2xl font-bold">
                ₹{property.rent}
                <span className="text-base font-normal ml-1">/month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-5 text-slate-700">Amenities</h2>

          <div className="flex flex-wrap gap-3">
            {property.wifi && (
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                WiFi
              </span>
            )}

            {property.food && (
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                Food
              </span>
            )}

            {property.ac && (
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium">
                AC
              </span>
            )}

            {property.laundry && (
              <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium">
                Laundry
              </span>
            )}
          </div>
        </div>

        {/* Description */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">Description</h2>

          <p className="text-slate-600 leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>
    </div>
  );
}
