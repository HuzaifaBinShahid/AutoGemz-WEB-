import { useState } from "react";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";

interface Auction {
  id: number;
  car: {
    image: string;
    model: string;
    year: number;
  };
  seller: string;
  createdAt: string;
  status: "LIVE" | "PENDING REVIEW" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
  highestBid: string | null;
  endsIn: string | null;
}

const Auctions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const auctions: Auction[] = [
    {
      id: 1,
      car: {
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100",
        model: "Corolla Altis",
        year: 2018,
      },
      seller: "@zainauto",
      createdAt: "2025-11-23 10:21 PM",
      status: "LIVE",
      highestBid: "PKR 2,850,000",
      endsIn: "01h 12m",
    },
    {
      id: 2,
      car: {
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100",
        model: "Honda City",
        year: 2020,
      },
      seller: "@abidcars",
      createdAt: "2025-11-23 06:08 PM",
      status: "PENDING REVIEW",
      highestBid: null,
      endsIn: null,
    },
    {
      id: 3,
      car: {
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100",
        model: "Prius S",
        year: 2017,
      },
      seller: "@hybridking",
      createdAt: "2025-11-23 10:21 PM",
      status: "SCHEDULED",
      highestBid: null,
      endsIn: "Starts in 03h",
    },
    {
      id: 4,
      car: {
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100",
        model: "Sportage AWD",
        year: 2021,
      },
      seller: "@eagleautos",
      createdAt: "2025-11-23 10:21 PM",
      status: "COMPLETED",
      highestBid: "PKR 1,830,000",
      endsIn: "Ended",
    },
    {
      id: 5,
      car: {
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100",
        model: "Civic Oriel",
        year: 2019,
      },
      seller: "@primecars",
      createdAt: "2025-11-23 10:21 PM",
      status: "CANCELLED",
      highestBid: null,
      endsIn: null,
    },
  ];

  const getStatusColor = (status: Auction["status"]) => {
    switch (status) {
      case "LIVE":
        return "#29DC9780";
      case "PENDING REVIEW":
        return "#F59E0B";
      case "SCHEDULED":
        return "#19ADD9";
      case "COMPLETED":
        return "#3EB549";
      case "CANCELLED":
        return "#DC3729";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div
        className="bg-white p-6"
        style={{
          boxShadow:
            "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Current Auctions
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-[#1F293733] rounded-lg focus:outline-none focus:ring-2 focus:ring-autogemz-orange text-gray-700 placeholder:text-gray-500"
            />
            <button className="px-4 py-2 border border-[#1F2937] rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>
        </div>

        <div className="mb-4 border-b border-[#1F29371A]" />

        <DataTable
          columns={[
            {
              key: "car",
              label: "CAR",
              render: (value: Auction["car"]) => (
                <div className="flex items-center gap-3">
                  <img
                    src={value.image}
                    alt={value.model}
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{value.model}</p>
                    <p className="text-sm text-gray-500">{value.year}</p>
                  </div>
                </div>
              ),
            },
            {
              key: "seller",
              label: "SELLER",
              render: (value: string) => (
                <span className="text-black">{value}</span>
              ),
            },
            {
              key: "createdAt",
              label: "CREATED AT",
            },
            {
              key: "status",
              label: "STATUS",
              render: (value: Auction["status"]) => (
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-black"
                  style={{ backgroundColor: getStatusColor(value) }}
                >
                  {value}
                </span>
              ),
            },
            {
              key: "highestBid",
              label: "HIGHEST BID",
              render: (value: string | null) => (
                <span className="text-gray-900 font-medium">
                  {value || "—"}
                </span>
              ),
            },
            {
              key: "endsIn",
              label: "ENDS IN",
              render: (value: string | null) => (
                <span className="text-[#1F2937] font-normal">
                  {value || "—"}
                </span>
              ),
            },
          ]}
          data={auctions}
        />
      </div>
    </div>
  );
};

export default Auctions;
