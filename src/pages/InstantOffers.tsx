import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";

interface InstantOffer {
  id: number;
  car: {
    image: string;
    model: string;
  };
  seller: string;
  offerId: string;
  estimatedValue: string;
  status: "NEW" | "PENDING" | "REVIEW" | "APPROVED" | "REJECTED";
  date: string;
}

const InstantOffers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const instantOffers: InstantOffer[] = [
    {
      id: 1,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2020 Corolla Altis",
      },
      seller: "PRIVATE SELLER",
      offerId: "IO-88214",
      estimatedValue: "PKR 3,150,000",
      status: "NEW",
      date: "02 Nov 2025",
    },
    {
      id: 2,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2020 Corolla Altis",
      },
      seller: "AUTOHAUS MOTORS",
      offerId: "IO-77102",
      estimatedValue: "PKR 6,850,000",
      status: "PENDING",
      date: "30 Oct 2025",
    },
    {
      id: 3,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2022 Kia Sportage AWD",
      },
      seller: "DEALER HUB",
      offerId: "IO-66902",
      estimatedValue: "PKR 4,150,000",
      status: "REVIEW",
      date: "29 Oct 2025",
    },
    {
      id: 4,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2020 Corolla Altis",
      },
      seller: "AUTOHAUS MOTORS",
      offerId: "IO-77102",
      estimatedValue: "PKR 6,850,000",
      status: "APPROVED",
      date: "30 Oct 2025",
    },
    {
      id: 5,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2020 Corolla Altis",
      },
      seller: "PRIVATE SELLER",
      offerId: "IO-88214",
      estimatedValue: "PKR 3,150,000",
      status: "REJECTED",
      date: "02 Nov 2025",
    },
  ];

  const statusColors: Record<InstantOffer["status"], string> = {
    NEW: "#19ADD9",
    PENDING: "#F59E0B",
    REVIEW: "#2DD4BF",
    APPROVED: "#3EB549",
    REJECTED: "#DC3729",
  };

  const columns = [
    {
      key: "car",
      label: "CAR / SELLER",
      render: (value: InstantOffer["car"], row: InstantOffer) => (
        <div className="flex items-center gap-3">
          <img
            src={value.image}
            alt={value.model}
            className="w-12 h-12 object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{value.model}</p>
            <p className="text-sm text-gray-500">{row.seller}</p>
          </div>
        </div>
      ),
    },
    {
      key: "offerId",
      label: "OFFER ID",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "estimatedValue",
      label: "ESTIMATED VALUE",
      render: (value: string) => (
        <span className="text-gray-900 font-medium">{value}</span>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (value: InstantOffer["status"]) => (
        <span
          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
          style={{ backgroundColor: statusColors[value] }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "date",
      label: "DATE",
      render: (value: string) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
  ];

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
            Recent Instant Offer Requests
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
          columns={columns}
          data={instantOffers}
          onRowClick={(row) => navigate(`/instant-offer/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default InstantOffers;
