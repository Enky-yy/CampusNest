import Link from "next/link";
import {
  MapPin,
  Search,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F8FAFC]" />

        <div className="relative max-w-7xl mx-auto px-6 py-32">

          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#60A5FA] text-[#1E293B] text-sm font-medium mb-6">
              <MapPin size={16} />
              Find hostels & PGs near your campus
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900">
              Find Your Perfect
              <span className="text-blue-600"> Stay!! </span>
              Near Campus
            </h1>

            <p className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover verified hostels, PGs, and student accommodations
              with maps, images, and smart search.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <Link
                href="/properties"
                className=" bg-[#2563EB] hover:bg-[#60A5FA] text-[white] px-8 py-4 rounded-xl font-medium transition"
              >
                Explore Properties
              </Link>

              <Link
                href="/map"
                className="bg-[#2563EB] hover:bg-[#60A5FA] border border-slate-300 px-8 py-4 rounded-xl font-medium transition text-[white]"
              >
                View Map
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-5xl font-bold text-blue-600">
              100+
            </h2>
            <p className="mt-3 text-slate-500">
              Verified Properties
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-5xl font-bold text-blue-600">
              500+
            </h2>
            <p className="mt-3 text-slate-500">
              Students Helped
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-5xl font-bold text-blue-600">
              50+
            </h2>
            <p className="mt-3 text-slate-500">
              Property Owners
            </p>
          </div>

        </div>
      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#1E293B]">
            Why Choose CampusNest?
          </h2>

          <p className="text-slate-500 mt-3">
            Everything students need to find accommodation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
  
            <div className="flex items-center gap-3 mb-4">
              <Search className="text-blue-600" size={28} />

              <h3 className="text-[#1E293B] text-xl font-semibold">
              Smart Search
              </h3>
            </div>

            <p className="text-slate-500">
            Filter properties by rent, amenities, and location in seconds.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
            <ShieldCheck
              className="text-green-600"
              size={28}
            />

            <h3 className="text-[#1E293B] font-semibold text-xl">
              Verified Listings
            </h3>
            </div>
            <p className="text-slate-500">
              Browse reliable listings from genuine
              property owners.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
            <Building2
              className="text-purple-600"
              size={28}
            />

            <h3 className="text-[#1E293B] font-semibold text-xl">
              Student Friendly
            </h3>
            </div>
            <p className="text-slate-500">
              Built specifically for students looking
              for hostels and PGs.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">

          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Next Stay?
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            Browse available properties or list your
            accommodation today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link
              href="/properties"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium"
            >
              Browse Properties
            </Link>

            <Link
              href="/register"
              className="border border-white px-6 py-3 rounded-xl font-medium"
            >
              Get Started
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


