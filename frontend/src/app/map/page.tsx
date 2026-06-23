"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import api from "@/src/lib/api";

const PropertyMap = dynamic(() => import("@/src/components/PropertyMap"), {
  ssr: false,
});

export default function MapPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const res = await api.get("/properties");

      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900">
            Explore Properties
          </h1>

          <p className="text-slate-500 text-lg mt-3">
            Discover hostels and PGs near your campus.
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">
              {properties.length}
            </h3>

            <p className="text-slate-500 mt-1">Properties Listed</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-green-600">Active</h3>

            <p className="text-slate-500 mt-1">Live Listings</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-3xl font-bold text-purple-600">Map View</h3>

            <p className="text-slate-500 mt-1">Interactive Search</p>
          </div>
        </div>

        {/* Map Container */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Property Locations
            </h2>

            <p className="text-slate-500 mt-1">
              Click a marker to view details.
            </p>
          </div>

          <div className="h-[650px]">
            <PropertyMap properties={properties} />
          </div>
        </div>
      </div>
    </div>
  );
}
