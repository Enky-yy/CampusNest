import Link from "next/link";
import { Property } from "@/src/types/property";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <Link href={`/properties/${property.id}`} className="block">
      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          border
          border-slate-200
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        {/* Image */}

        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.title}
            className="
              w-full
              h-56
              object-cover
            "
          />
        ) : (
          <div
            className="
              w-full
              h-56
              bg-slate-200
              flex
              items-center
              justify-center
              text-slate-500
            "
          >
            No Image Available
          </div>
        )}

        {/* Content */}

        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                  line-clamp-1
                "
              >
                {property.title}
              </h2>

              <p
                className="
                  text-slate-500
                  mt-1
                  line-clamp-1
                "
              >
                📍 {property.address}
              </p>
            </div>
          </div>

          {/* Rent */}

          <div className="mt-4">
            <span
              className="
                text-3xl
                font-bold
                text-blue-600
              "
            >
              ₹{property.rent}
            </span>

            <span
              className="
                text-slate-500
                ml-1
              "
            >
              /month
            </span>
          </div>

          {/* Amenities */}

          <div
            className="
              flex
              flex-wrap
              gap-2
              mt-4
            "
          >
            {property.wifi && (
              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-100
                  text-blue-700
                  text-sm
                "
              >
                WiFi
              </span>
            )}

            {property.food && (
              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-sm
                "
              >
                Food
              </span>
            )}

            {property.ac && (
              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-purple-100
                  text-purple-700
                  text-sm
                "
              >
                AC
              </span>
            )}

            {property.laundry && (
              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-orange-100
                  text-orange-700
                  text-sm
                "
              >
                Laundry
              </span>
            )}
          </div>

          {/* CTA */}

          <div
            className="
              mt-5
              pt-4
              border-t
              border-slate-100
            "
          >
            <span
              className="
                text-blue-600
                font-medium
              "
            >
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
