import { useState } from "react";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";

interface Dispute {
  id: number;
  user: {
    image: string;
    name: string;
    role: "PRIVATE SELLER" | "DEALER";
  };
  queryId: string;
  subject: string;
  status: "PENDING" | "REVIEW" | "RESOLVED" | "CLOSED";
  dateReceived: string;
}

const DisputesCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const disputes: Dispute[] = [
    {
      id: 1,
      user: {
        image: "https://ui-avatars.com/api/?name=Ahmed+Khan&background=random",
        name: "Ahmed Khan",
        role: "PRIVATE SELLER",
      },
      queryId: "QRY-55201",
      subject: "Payment not received",
      status: "PENDING",
      dateReceived: "26 Oct 2025",
    },
    {
      id: 2,
      user: {
        image: "https://ui-avatars.com/api/?name=AutoHaus+Motors&background=random",
        name: "AutoHaus Motors",
        role: "DEALER",
      },
      queryId: "QRY-55132",
      subject: "Issue with inspection report",
      status: "REVIEW",
      dateReceived: "26 Oct 2025",
    },
    {
      id: 3,
      user: {
        image: "https://ui-avatars.com/api/?name=AutoHaus+Motors&background=random",
        name: "AutoHaus Motors",
        role: "DEALER",
      },
      queryId: "QRY-55132",
      subject: "Refund taking too long",
      status: "RESOLVED",
      dateReceived: "26 Oct 2025",
    },
    {
      id: 4,
      user: {
        image: "https://ui-avatars.com/api/?name=AutoHaus+Motors&background=random",
        name: "AutoHaus Motors",
        role: "DEALER",
      },
      queryId: "QRY-55132",
      subject: "Wrong mileage entered",
      status: "CLOSED",
      dateReceived: "26 Oct 2025",
    },
  ];

  const statusColors: Record<Dispute["status"], string> = {
    PENDING: "#F59E0B",
    REVIEW: "#2DD4BF",
    RESOLVED: "#3EB549",
    CLOSED: "#6B7280",
  };

  const columns = [
    {
      key: "user",
      label: "USER / DEALER",
      render: (value: Dispute["user"]) => (
        <div className="flex items-center gap-3">
          <img
            src={value.image}
            alt={value.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{value.name}</p>
            <p className="text-sm text-gray-500">{value.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "queryId",
      label: "QUERY ID",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "subject",
      label: "SUBJECT",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (value: Dispute["status"]) => (
        <span
          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
          style={{ backgroundColor: statusColors[value] }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "dateReceived",
      label: "DATE RECEIVED",
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
            Support Queries
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

        <DataTable columns={columns} data={disputes} />
      </div>
    </div>
  );
};

export default DisputesCenter;
