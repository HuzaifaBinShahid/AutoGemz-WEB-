import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";
import { auctionService } from "../services/auctionService";
import type { Auction } from "../services/auctionService";

const Auctions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['auctions', 1, 10],
    queryFn: () => auctionService.getAuctions({ page: 1, limit: 10, isActive: true }),
  });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message || "Error loading auctions");
    }
  }, [isError, error]);

  const auctions = data?.results || [];

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "LIVE":
      case "ACTIVE":
        return "#29DC9780";
      case "PENDING":
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

  const calculateEndsIn = (endTime: string) => {
    if (!endTime) return "—";
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
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
            <p className="text-red-500 font-medium">Failed to load auctions. Please try again.</p>
          </div>
        ) : auctions.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-xl font-medium">No auctions found</p>
          </div>
        ) : (
          <DataTable
            columns={[
              {
                key: "title",
                label: "AUCTION",
                render: (value: string, row: Auction) => (
                  <div>
                    <p className="font-medium text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{row.description}</p>
                  </div>
                ),
              },
              {
                key: "vehicles",
                label: "MINIMUM BID",
                render: (vehicles: Auction["vehicles"]) => (
                  <span className="text-black">
                    {vehicles?.[0]?.minimumBidAmount ? `AED ${vehicles[0].minimumBidAmount.toLocaleString()}` : "N/A"}
                  </span>
                ),
              },
              {
                key: "startDate",
                label: "START DATE",
                render: (value: string) => (
                  <span className="text-gray-700">
                    {new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                ),
              },
              {
                key: "status",
                label: "STATUS",
                render: (value: string) => (
                  <span
                    className="inline-block px-3 py-1 text-sm font-medium text-black uppercase"
                    style={{ backgroundColor: getStatusColor(value), borderRadius: "20px" }}
                  >
                    {value || "PENDING"}
                  </span>
                ),
              },
              {
                key: "vehicles",
                label: "BID INCREMENT",
                render: (vehicles: Auction["vehicles"]) => (
                  <span className="text-gray-900 font-medium">
                    {vehicles?.[0]?.bidIncrement ? `AED ${vehicles[0].bidIncrement.toLocaleString()}` : "—"}
                  </span>
                ),
              },
              {
                key: "endDate",
                label: "ENDS IN",
                render: (value: string) => (
                  <span className="text-[#1F2937] font-normal">
                    {calculateEndsIn(value)}
                  </span>
                ),
              },
            ]}
            data={auctions}
            onRowClick={(row) => navigate(`/auctions/${row.id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default Auctions;
