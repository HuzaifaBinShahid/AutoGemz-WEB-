import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";

interface InspectionReport {
  id: number;
  car: {
    image: string;
    model: string;
    year: number;
  };
  inspectionId: string;
  location: string;
  inspector: string;
  status: "PENDING" | "PASSED" | "FAILED";
  scheduledOn: string;
  completedOn: string | null;
}

const InspectionReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const inspectionReports: InspectionReport[] = [
    {
      id: 1,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "Corolla Altis",
        year: 2018,
      },
      inspectionId: "INSP 10457",
      location: "Lahore",
      inspector: "Ahmed Raza",
      status: "PENDING",
      scheduledOn: "26 Oct 2025",
      completedOn: null,
    },
    {
      id: 2,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "Civic Oriel",
        year: 2020,
      },
      inspectionId: "INSP 10423",
      location: "Karachi",
      inspector: "Sana Qureshi",
      status: "PASSED",
      scheduledOn: "27 Aug 2025",
      completedOn: "28 Aug 2025",
    },
    {
      id: 3,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "Sportage AWD",
        year: 2025,
      },
      inspectionId: "INSP 10389",
      location: "Islamabad",
      inspector: "Bilal Khan",
      status: "FAILED",
      scheduledOn: "29 May 2025",
      completedOn: "30 Apr 2025",
    },
    {
      id: 4,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "Civic Oriel",
        year: 2020,
      },
      inspectionId: "INSP 10423",
      location: "Karachi",
      inspector: "Sana Qureshi",
      status: "PASSED",
      scheduledOn: "27 Aug 2025",
      completedOn: "28 Aug 2025",
    },
    {
      id: 5,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "Corolla Altis",
        year: 2018,
      },
      inspectionId: "INSP 10457",
      location: "Lahore",
      inspector: "Ahmed Raza",
      status: "PENDING",
      scheduledOn: "26 Oct 2025",
      completedOn: null,
    },
  ];

  const statusColors: Record<InspectionReport["status"], string> = {
    PENDING: "#F59E0B",
    PASSED: "#3EB549",
    FAILED: "#DC3729",
  };

  const columns = [
    {
      key: "car",
      label: "CAR",
      render: (value: InspectionReport["car"]) => (
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
      key: "inspectionId",
      label: "INSPECTION ID",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "location",
      label: "LOCATION",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "inspector",
      label: "INSPECTOR",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (value: InspectionReport["status"]) => (
        <span
          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
          style={{ backgroundColor: statusColors[value] }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "scheduledOn",
      label: "SCHEDULED ON",
      render: (value: string) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
    {
      key: "completedOn",
      label: "COMPLETED ON",
      render: (value: string | null) => (
        <span className="text-gray-700">{value || "—"}</span>
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
            Inspection Report
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
          data={inspectionReports}
          onRowClick={(row) => navigate(`/inspection-report/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default InspectionReport;
