"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import api from "@/src/lib/api";
import { getToken } from "@/src/lib/auth";

import ProtectedRoute from "@/src/components/ProtectedRoutes";

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
  image_url:'',
}

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  async function fetchMyProperties() {
    try {
      const token = getToken();

      const res = await api.get("/properties/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProperty(id: number) {
    try {
      const token = getToken();

      await api.delete(`/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(properties.filter((property) => property.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete property");
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-5xl font-bold text-slate-900">Dashboard</h1>

              <p className="text-slate-500 mt-2">
                Manage your listed properties.
              </p>
            </div>

            <Link
              href="/add-property"
              className="
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
              Add Property
            </Link>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-3xl font-bold text-blue-600">
                {properties.length}
              </h2>

              <p className="text-slate-500 mt-1">Total Properties</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-3xl font-bold text-green-600">Active</h2>

              <p className="text-slate-500 mt-1">Listings</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-3xl font-bold text-purple-600">CampusNest</h2>

              <p className="text-slate-500 mt-1">Property Manager</p>
            </div>
          </div>

          {/* Empty State */}

          {properties.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">
                No Properties Yet
              </h2>

              <p className="text-slate-500 mt-3">
                Start by adding your first property.
              </p>

              <Link
                href="/add-property"
                className="
                inline-block
                mt-6
                bg-blue-600
                text-white
                px-6
                py-3
                rounded-xl
              "
              >
                Add Property
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-slate-200
                    shadow-sm
                    hover:shadow-lg
                    transition
                  "
                >
                  {property.image_url && (
                    <img
                      src={property.image_url}
                      alt={property.title}
                      className="
                        w-full
                        h-48
                        object-cover
                      "
                    />
                  )}

                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {property.title}
                    </h2>

                    <p className="text-slate-500 mt-1">📍 {property.address}</p>

                    <p className="text-blue-600 text-2xl font-bold mt-4">
                      ₹{property.rent}
                      <span className="text-sm text-slate-500 font-normal ml-1">
                        /month
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {property.wifi && (
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                          WiFi
                        </span>
                      )}

                      {property.food && (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                          Food
                        </span>
                      )}

                      {property.ac && (
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                          AC
                        </span>
                      )}

                      {property.laundry && (
                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                          Laundry
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-6">
                      <Link
                        href={`/properties/${property.id}`}
                        className="
                          flex-1
                          text-center
                          border
                          border-slate-300
                          py-2
                          rounded-xl
                        "
                      >
                        View
                      </Link>

                      <Link
                        href={`/edit-property/${property.id}`}
                        className="
                          flex-1
                          text-center
                          bg-blue-600
                          text-white
                          py-2
                          rounded-xl
                        "
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProperty(property.id)}
                        className="
                          px-4
                          bg-red-500
                          text-white
                          rounded-xl
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
