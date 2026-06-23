"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import api from "@/src/lib/api";
import { getToken } from "@/src/lib/auth";
import ProtectedRoute from "@/src/components/ProtectedRoutes";

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProperty();
  }, []);

  async function fetchProperty() {
    try {
      const res = await api.get(`/properties/${params.id}`);

      setForm({
        title: res.data.title,
        description: res.data.description,
        rent: res.data.rent.toString(),
        address: res.data.address,
        wifi: res.data.wifi,
        food: res.data.food,
        ac: res.data.ac,
        laundry: res.data.laundry,
        image_url: res.data.image_url || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load property");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const token = getToken();

      await api.put(
        `/properties/${params.id}`,
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

      alert("Property updated");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);

      alert("Failed to update property");
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-700">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900">Edit Property</h1>

            <p className="text-slate-500 mt-3">Update your listing.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />

              <textarea
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />

              <input
                type="number"
                value={form.rent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    rent: e.target.value,
                  })
                }
                placeholder="Rent"
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />

              <input
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                placeholder="Address"
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />

              <input
                value={form.image_url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image_url: e.target.value,
                  })
                }
                placeholder="Image URL"
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />

              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="
                    w-full
                    h-64
                    object-cover
                    rounded-2xl
                  "
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                <label>
                  <input
                    type="checkbox"
                    checked={form.wifi}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        wifi: e.target.checked,
                      })
                    }
                  />{" "}
                  WiFi
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={form.food}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        food: e.target.checked,
                      })
                    }
                  />{" "}
                  Food
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={form.ac}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ac: e.target.checked,
                      })
                    }
                  />{" "}
                  AC
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={form.laundry}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        laundry: e.target.checked,
                      })
                    }
                  />{" "}
                  Laundry
                </label>
              </div>

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
                "
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
