"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);

      alert(
        err?.response?.data?.detail ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200 p-8">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="text-slate-600 mt-2">
              Login to access your
              CampusNest account.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
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
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
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
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-70
                text-white
                py-3
                rounded-xl
                font-medium
                transition
              "
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-slate-600">

              Don't have an account?

              <Link
                href="/register"
                className="
                  ml-2
                  text-blue-600
                  hover:text-blue-700
                  font-medium
                "
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

