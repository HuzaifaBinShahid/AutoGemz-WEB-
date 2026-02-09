import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/common/DataTable";
import { inspectionService } from "../services/inspectionService";

const InspectorInspectionList = () => {
  const [activeTab, setActiveTab] = useState<"all" | "mylist">("all");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['inspector-inspections', activeTab],
    queryFn: () => inspectionService.getInspectorVehicles({ 
      page: 1, 
      limit: 10,
      sortBy: 'createdAt:desc'
    }),
  });

  const inspections = data?.results || [];

  const statusColors: Record<string, string> = {
    PENDING: "#F59E0B",
    PASSED: "#3EB549",
    FAILED: "#DC3729",
    COMPLETED: "#3EB549",
    APPROVED: "#3EB549",
    ACTIVE: "#3EB549",
    "IN PROGRESS": "#3B82F6",
    REQUEST: "#F59E0B",
    INSPECTED: "#3EB549",
  };

  const columns = [
    {
      key: "car",
      label: "CAR",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-3">
          <img
            src={row.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
            alt={row.model}
            className="w-12 h-12 object-cover"
            style={{ borderRadius: "0" }}
          />
          <div>
            <p className="font-medium text-gray-900">{row.make} {row.model}</p>
            <p className="text-sm text-gray-500">{row.year}</p>
          </div>
        </div>
      ),
    },
    {
      key: "inspectionId",
      label: "INSPECTION ID",
      render: (value: string) => <span className="text-gray-900">{value || "N/A"}</span>,
    },
    {
      key: "location",
      label: "LOCATION",
      render: (_: any, row: any) => <span className="text-gray-900">{row.city || row.location || "N/A"}</span>,
    },
    {
      key: "inspectorName",
      label: "INSPECTOR",
      render: (value: string) => <span className="text-gray-900">{value || "N/A"}</span>,
    },
    {
      key: "status",
      label: "STATUS",
      render: (_: string, row: any) => {
        const status = row.vehicleStatus || row.status || row.adStatus || "PENDING";
        return (
          <span
            className="inline-block px-3 py-1 text-sm font-medium text-white uppercase"
            style={{ backgroundColor: statusColors[status?.toUpperCase()] || "#9CA3AF", borderRadius: "0" }}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "completedOn",
      label: "COMPLETED ON",
      render: (value: string | null) => (
        <span className="text-gray-700">
          {value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "—"}
        </span>
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

        {isLoading ? (
          <div className="space-y-4 py-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 w-full animate-pulse bg-gray-50 flex items-center px-4 gap-4">
                <div className="w-12 h-12 bg-gray-200" />
                <div className="flex-1 h-4 bg-gray-200" />
                <div className="w-24 h-4 bg-gray-200" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-20 text-center">
            <p className="text-red-500 font-medium">Failed to load inspections. Please try again.</p>
          </div>
        ) : inspections.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-xl font-medium">No inspection reports found</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={inspections}
            onRowClick={(row) => navigate(`/inspector/${row.id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default InspectorInspectionList;
