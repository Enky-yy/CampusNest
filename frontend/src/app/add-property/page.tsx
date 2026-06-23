"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/src/lib/api";
import { getToken } from "@/src/lib/auth";
import ProtectedRoute from "@/src/components/ProtectedRoutes";

export default function AddPropertyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    rent: "",
    address: "",

    wifi: false,
    food: false,
    ac: false,
    laundry: false,
    image_url: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const token = getToken();

      await api.post(
        "/properties",
        {
          ...form,
          rent: Number(form.rent),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Property created");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create property");
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-10">
          {/* Header */}

          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900">Add Property</h1>

            <p className="text-slate-500 mt-3 text-lg">
              Create a new hostel or PG listing.
            </p>
          </div>

          {/* Form Card */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Title
                </label>

                <input
                  className="
                  w-full
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
                  placeholder="Sunrise PG"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Description */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  className="
                  w-full
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
                  placeholder="Describe your property..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Rent */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Rent
                </label>

                <input
                  type="number"
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  text-slate-900
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                  placeholder="6500"
                  value={form.rent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rent: e.target.value,
                    })
                  }
                />
              </div>

              {/* Address */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>

                <input
                  className="
                  w-full
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
                  placeholder="Lanka, Varanasi"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              {/* Image */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Image URL
                </label>

                <input
                  className="
                  w-full
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
                  placeholder="https://..."
                  value={form.image_url}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image_url: e.target.value,
                    })
                  }
                />
              </div>

              {/* Amenities */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Amenities
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.wifi}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          wifi: e.target.checked,
                        })
                      }
                    />
                    WiFi
                  </label>

                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.food}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          food: e.target.checked,
                        })
                      }
                    />
                    Food
                  </label>

                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.ac}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ac: e.target.checked,
                        })
                      }
                    />
                    AC
                  </label>

                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.laundry}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          laundry: e.target.checked,
                        })
                      }
                    />
                    Laundry
                  </label>
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
              "
              >
                Create Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
