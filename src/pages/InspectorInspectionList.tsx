import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/common/DataTable";

interface InspectionItem {
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
  completedOn: string | null;
}

const InspectorInspectionList = () => {
  const [activeTab, setActiveTab] = useState<"all" | "mylist">("all");
  const navigate = useNavigate();

  const inspections: InspectionItem[] = [
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
      completedOn: "30 Apr 2025",
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
      completedOn: null,
    },
  ];

  const statusColors: Record<InspectionItem["status"], string> = {
    PENDING: "#F59E0B",
    PASSED: "#3EB549",
    FAILED: "#DC3729",
  };

  const columns = [
    {
      key: "car",
      label: "CAR",
      render: (value: InspectionItem["car"]) => (
        <div className="flex items-center gap-3">
          <img
            src={value.image}
            alt={value.model}
            className="w-12 h-12 object-cover"
            style={{ borderRadius: "0" }}
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
      render: (value: string) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: "location",
      label: "LOCATION",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: "inspector",
      label: "INSPECTOR",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: "status",
      label: "STATUS",
      render: (value: InspectionItem["status"]) => (
        <span
          className="inline-block px-3 py-1 text-sm font-medium text-white"
          style={{ backgroundColor: statusColors[value], borderRadius: "0" }}
        >
          {value}
        </span>
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
          borderRadius: "0",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-2 text-sm font-medium uppercase transition-colors ${
                activeTab === "all"
                  ? "text-[#DC3729] border-b-2 border-[#DC3729]"
                  : "text-gray-600"
              }`}
              style={activeTab === "all" ? { borderBottomWidth: "2px" } : {}}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab("mylist")}
              className={`pb-2 text-sm font-medium uppercase transition-colors ${
                activeTab === "mylist"
                  ? "text-[#DC3729] border-b-2 border-[#DC3729]"
                  : "text-gray-600"
              }`}
              style={activeTab === "mylist" ? { borderBottomWidth: "2px" } : {}}
            >
              My List
            </button>
          </div>
          <button
            onClick={() => navigate("/inspector/add")}
            className="px-4 py-2 text-sm font-semibold text-white uppercase"
            style={{
              backgroundColor: "#DC3729",
              borderRadius: "0",
            }}
          >
            ADD NEW
          </button>
        </div>

        <div className="mb-4 border-b border-[#1F29371A]" />

        <DataTable
          columns={columns}
          data={inspections}
          onRowClick={(row) => navigate(`/inspector/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default InspectorInspectionList;
