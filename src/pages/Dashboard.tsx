import MetricCard from "../components/Dashboard/MetricCard";
import UsersIcon from "../components/svgs/dashboard/UsersIcon";
import CardIcon from "../components/svgs/dashboard/CardIcon";
import CoinsIcon from "../components/svgs/dashboard/CoinsIcon";
import ActiveUsersIcon from "../components/svgs/dashboard/ActiveUsersIcon";
import RefreshDataIcon from "../components/svgs/dashboard/RefreshDataIcon";
import { ShareIcon } from "../components/svgs/dashboard/ShareIcon";
import ThreeDotsIcon from "../components/svgs/dashboard/ThreeDotsIcon";
import MonthlyAuctionsChart from "../components/Dashboard/MonthlyAuctionsChart";
import MonthlyInspectionRevenueChart from "../components/Dashboard/MonthlyInspectionRevenueChart";
import AuctionsByCategoryChart from "../components/Dashboard/AuctionsByCategoryChart";
import CurrentAuctionsTable from "../components/Dashboard/CurrentAuctionsTable";
import { useQuery } from "@tanstack/react-query";
import { auctionService } from "../services/auctionService";

const Dashboard = () => {
  const { data: auctionData } = useQuery({
    queryKey: ['dashboard-metrics-auctions'],
    queryFn: () => auctionService.getAuctions({ isActive: true, limit: 1 }),
  });

  return (
    <div
      className="p-6 bg-[#F2F2F2]"
    >
      <div className="flex justify-between mb-4">
        <div className="px-3 py-2 border border-[#1F293733] bg-[#FFFFFF] text-[#1F2937] text-[16px] font-normal">
          2025-11-21 ~ 2025-11-21
        </div>

        <div className="flex">
          <button className="px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm text-gray-700">
            <RefreshDataIcon />
            <span className="text-[#1F2937]">Refresh Data</span>
          </button>
          <button className="px-3 py-2  rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm text-gray-700">
            <ShareIcon />
            <span className="text-[#1F2937]">Share Icon</span>
          </button>
          <button className="p-2  rounded-lg hover:bg-gray-50 transition-colors">
            <ThreeDotsIcon />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="New Users"
          value="34.7K"
          change={{
            value: "2300",
            percentage: "22%",
            isPositive: true,
          }}
          icon={<UsersIcon />}
        />
        <MetricCard
          title="Active Auctions"
          value={auctionData?.totalResults?.toString() || "0"}
          subtitle="Live now"
          icon={<CardIcon />}
        />
        <MetricCard
          title="Inspection Revenue"
          value="PKR 18K"
          subtitle="Current month"
          icon={<CoinsIcon />}
        />
        <MetricCard
          title="Active Users"
          value="5.6K"
          change={{
            value: "300",
            percentage: "18%",
            isPositive: false,
          }}
          icon={<ActiveUsersIcon />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <MonthlyAuctionsChart />
        <MonthlyInspectionRevenueChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="flex">
          <div
            className="flex-1 p-6"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
            }}
          >
            <p className="text-[16px] mb-2" style={{ color: "#1F293799" }}>
              PENDING INSPECTIONS
            </p>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">56</h3>
            <span
              className="inline-block px-3 py-1 rounded text-sm text-gray-600"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              AWAITING VERIFICATION
            </span>
          </div>
          <div
            style={{
              width: "1px",
              backgroundColor: "#E5E7EB",
            }}
          />
          <div
            className="flex-1 p-6"
            style={{
              backgroundColor: "#FFFFFF",
            }}
          >
            <p className="text-[16px] mb-2" style={{ color: "#1F293799" }}>
              REFUND REQUESTS
            </p>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">14</h3>
            <span
              className="inline-block px-3 py-1 rounded text-sm text-gray-600"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              IN QUEUE
            </span>
          </div>
        </div>
        
        <div className="flex">
          <div
            className="flex-1 p-6"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
            }}
          >
            <p className="text-[16px] mb-2" style={{ color: "#1F293799" }}>
              DISPUTES
            </p>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">9</h3>
            <span
              className="inline-block px-3 py-1 rounded text-sm text-gray-600"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              OPEN CASES
            </span>
          </div>
          <div
            style={{
              width: "1px",
              backgroundColor: "#E5E7EB",
            }}
          />
          <div
            className="flex-1 p-6"
            style={{
              backgroundColor: "#FFFFFF",
            }}
          >
            <p className="text-[16px] mb-2" style={{ color: "#1F293799" }}>
              WALLET DEPOSITS
            </p>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">PKR 5,620,000</h3>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CurrentAuctionsTable />
        <AuctionsByCategoryChart />
      </div>
    </div>
  );
};

export default Dashboard;
