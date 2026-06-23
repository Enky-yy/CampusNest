"use client";

import { useEffect, useState } from "react";

import api from "@/src/lib/api";

import PropertyCard from "@/src/components/PropertyCard";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);

  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const [wifi, setWifi] = useState(false);
  const [food, setFood] = useState(false);
  const [ac, setAc] = useState(false);
  const [laundry, setLaundry] = useState(false);

  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const params: any = {};

      if (minRent) params.min_rent = minRent;

      if (maxRent) params.max_rent = maxRent;

      if (address) params.address = address;

      if (wifi) params.wifi = true;

      if (food) params.food = true;

      if (ac) params.ac = true;

      if (laundry) params.laundry = true;

      const res = await api.get("/properties", {
        params,
      });

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

          <p className="text-slate-500 mt-3 text-lg">
            Find hostels and PGs that match your needs.
          </p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Search Filters
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-900
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            />

            <input
              type="number"
              placeholder="Minimum Rent"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
              className="
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-900
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            />

            <input
              type="number"
              placeholder="Maximum Rent"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              className="
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-900
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <label className="flex items-center gap-2  text-slate-700">
              <input
                type="checkbox"
                checked={wifi}
                onChange={(e) => setWifi(e.target.checked)}
              />
              WiFi
            </label>

            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={food}
                onChange={(e) => setFood(e.target.checked)}
              />
              Food
            </label>

            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={ac}
                onChange={(e) => setAc(e.target.checked)}
              />
              AC
            </label>

            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={laundry}
                onChange={(e) => setLaundry(e.target.checked)}
              />
              Laundry
            </label>
          </div>

          <button
            onClick={fetchProperties}
            className="
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            transition
          "
          >
            Search Properties
          </button>
        </div>

        {/* Results */}

        {properties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
            <h3 className="text-2xl font-semibold text-slate-900">
              No Properties Found
            </h3>

            <p className="text-slate-500 mt-3">
              Try changing your filters and search again.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
