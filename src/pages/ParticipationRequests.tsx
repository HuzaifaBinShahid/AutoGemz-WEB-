import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DataTable from "../components/common/DataTable";
import api from "../lib/api";
import { useState } from "react";
import { toast } from "react-hot-toast";

const fetchParticipationRequests = async () => {
  const response = await api.get("/admin/auction-participation-requests");
  return response.data.data?.results || [];
};

const updateRequestStatus = async (requestId: string, status: string) => {
  await api.patch(`/admin/auction-participation-requests/${requestId}`, {
    status,
  });
};

const ParticipationRequests = () => {
  const queryClient = useQueryClient();
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    requestId: string;
    status: string;
  }>({ isOpen: false, requestId: "", status: "" });

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["participationRequests"],
    queryFn: fetchParticipationRequests,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: string;
    }) => updateRequestStatus(requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participationRequests"] });
      toast.success("Participation request updated successfully");
      setConfirmModal({ isOpen: false, requestId: "", status: "" });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update participation request",
      );
      setConfirmModal({ isOpen: false, requestId: "", status: "" });
    },
  });

  const handleStatusChange = (requestId: string, status: string) => {
    setConfirmModal({ isOpen: true, requestId, status });
  };

  const handleConfirm = () => {
    updateMutation.mutate({
      requestId: confirmModal.requestId,
      status: confirmModal.status,
    });
  };

  const columns = [
    {
      key: "userName",
      label: "User Name",
      render: (_: any, row: any) => row.userId?.fullName || "—",
    },
    {
      key: "userEmail",
      label: "User Email",
      render: (_: any, row: any) => row.userId?.email || "—",
    },
    {
      key: "auctionTitle",
      label: "Auction Title",
      render: (_: any, row: any) => row.auctionId?.title || "—",
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            value === "approved"
              ? "bg-green-100 text-green-800"
              : value === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value || "pending"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Request Date",
      render: (_: any, row: any) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) =>
        row.status === "pending" ? (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(row.id, "approved");
              }}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(row.id, "rejected");
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
  ];

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Participation Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Manage auction participation requests from users
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-lg font-medium">
              No participation requests found
            </p>
            <p className="text-sm mt-1">
              Requests will appear here when users apply to participate in
              auctions
            </p>
          </div>
        ) : (
          <DataTable columns={columns} data={requests} />
        )}
      </div>

      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs border border-gray-200">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Confirm Action
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {confirmModal.status} this participation
              request?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setConfirmModal({ isOpen: false, requestId: "", status: "" })
                }
                className="px-4 py-2 border-2 rounded hover:bg-gray-50 text-gray-900"
                style={{
                  borderColor: "#DC3729",
                  color: "#DC3729",
                  backgroundColor: "white",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={updateMutation.isPending}
                className="px-4 py-2 text-white rounded"
                style={{
                  backgroundColor:
                    confirmModal.status === "approved" ? "#10B981" : "#DC3729",
                }}
              >
                {updateMutation.isPending ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipationRequests;
