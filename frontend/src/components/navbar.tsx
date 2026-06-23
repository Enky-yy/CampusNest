"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link href="/" className="font-bold text-xl">
          CampusNest
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/">Home</Link>

          <Link href="/properties">Properties</Link>
          <Link href="/map">Map</Link>

          {token && (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <Link href="/add-property">Add Property</Link>
            </>
          )}

          {!token ? (
            <>
              <Link href="/login">Login</Link>

              <Link href="/register">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="border px-4 py-2 rounded">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
