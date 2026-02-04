import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";
import { inspectionService } from "../services/inspectionService";
import AssignInspectorModal from "../components/common/AssignInspectorModal";

interface InspectionReportRow {
  id: string;
  car: {
    image: string;
    model: string;
    year: number;
    make: string;
  };
  inspectionId: string;
  location: string;
  inspector: string;
  status: string;
  scheduledOn: string;
  completedOn: string;
  isAssigned: boolean;
}

const InspectionReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['inspections', 1, 10],
    queryFn: () => inspectionService.getInspectorVehicles({ page: 1, limit: 10 }),
  });

  const assignMutation = useMutation({
    mutationFn: ({ vehicleId, inspectorId }: { vehicleId: string; inspectorId: string }) =>
      inspectionService.assignInspector(vehicleId, inspectorId),
    onSuccess: () => {
      toast.success("Inspector assigned successfully");
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      setIsAssignModalOpen(false);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to assign inspector");
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message || "Error loading inspection reports");
    }
  }, [isError, error]);

  const formatInspectionData = (reports: any[]): InspectionReportRow[] => {
    return reports.map((r) => ({
      id: r.id,
      car: {
        image: r.images?.[0] || "https://placehold.co/600x400?text=No+Image",
        model: r.model || "Vehicle",
        make: r.make || "Unknown",
        year: r.year || 0,
      },
      inspectionId: r.inspectionId || "N/A",
      location: r.city || r.location || "N/A",
      inspector: r.inspectorName || "N/A",
      status: (r.status || "PENDING").toUpperCase(),
      scheduledOn: r.scheduledOn ? new Date(r.scheduledOn).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A",
      completedOn: r.completedOn ? new Date(r.completedOn).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : "—",
      isAssigned: !!r.inspectorId,
    }));
  };

  const reports: InspectionReportRow[] = data?.results ? formatInspectionData(data.results) : [];

  const handleAssignClick = (e: React.MouseEvent, vehicleId: string) => {
    e.stopPropagation();
    setSelectedVehicleId(vehicleId);
    setIsAssignModalOpen(true);
  };

  const handleAssignConfirm = (inspectorId: string) => {
    if (selectedVehicleId) {
      assignMutation.mutate({ vehicleId: selectedVehicleId, inspectorId });
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: "#F59E0B",
    PASSED: "#3EB549",
    FAILED: "#DC3729",
    COMPLETED: "#3EB549",
    "IN PROGRESS": "#3B82F6",
  };

  const columns = [
    {
      key: "car",
      label: "CAR",
      render: (value: InspectionReportRow["car"]) => (
        <div className="flex items-center gap-3">
          <img
            src={value.image}
            alt={value.model}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="font-medium text-gray-900">{value.make} {value.model}</p>
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
      render: (value: string) => (
        <span
          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
          style={{ backgroundColor: statusColors[value] || "#9CA3AF" }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "assign",
      label: "ASSIGN",
      render: (_: any, row: InspectionReportRow) => (
        <button
          onClick={(e) => handleAssignClick(e, row.id)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
            row.isAssigned
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-autogemz-orange text-white hover:bg-opacity-90 shadow-sm"
          }`}
          disabled={row.isAssigned}
        >
          {row.isAssigned ? "Assigned" : "Assign"}
        </button>
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
      render: (value: string) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<"all" | "mylist">("all");

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
        <h1
          className="uppercase mb-6"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
            color: "#494949",
          }}
        >
          INSPECTION LIST
        </h1>

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
          
          <div className="flex items-center gap-3">
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
        </div>

        <div className="mb-4 border-b border-[#1F29371A]" />

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-100 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">❌ Error loading reports. Please try again.</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-20 bg-white">
            <p className="text-6xl mb-4 grayscale opacity-20">📋</p>
            <p className="text-gray-400 text-xl font-medium">No inspection reports found</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={reports}
            onRowClick={(row) => navigate(`/inspection-report/${row.id}`)}
          />
        )}
      </div>

      <AssignInspectorModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onConfirm={handleAssignConfirm}
        isLoading={assignMutation.isPending}
      />
    </div>
  );
};

export default InspectionReport;
