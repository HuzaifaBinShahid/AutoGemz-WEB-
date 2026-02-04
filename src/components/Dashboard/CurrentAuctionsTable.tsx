import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auctionService } from "../../services/auctionService";

const CurrentAuctionsTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-auctions'],
    queryFn: () => auctionService.getAuctions({ isActive: true, limit: 5 }),
  });

  const auctions = data?.results || [];

  const calculateEndsIn = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      className="bg-white p-6"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "#1F2937" }}>
          Live Auctions
        </h3>
        <button 
          onClick={() => navigate('/auctions')}
          className="text-sm font-medium text-[#DC3729] hover:underline"
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderTop: "1px solid #F2F2F2", borderBottom: "1px solid #F2F2F2" }}>
              <th className="text-left py-3 px-4 font-medium" style={{ color: "#1F293799" }}>AUCTION</th>
              <th className="text-left py-3 px-4 font-medium" style={{ color: "#1F293799" }}>VEHICLES</th>
              <th className="text-left py-3 px-4 font-medium" style={{ color: "#1F293799" }}>STATUS</th>
              <th className="text-left py-3 px-4 font-medium" style={{ color: "#1F293799" }}>ENDS IN</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">Loading auctions...</td>
              </tr>
            ) : auctions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">No active auctions found</td>
              </tr>
            ) : (
              auctions.map((auction) => (
                <tr 
                  key={auction.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/auctions/${auction.id}`)}
                  style={{ borderBottom: "1px solid #F2F2F2" }}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{auction.title}</div>
                    <div className="text-xs text-gray-500 truncate w-48">{auction.description}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{auction.vehicles?.length || 0}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-600 uppercase">
                      {auction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {calculateEndsIn(auction.endDate)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentAuctionsTable;
