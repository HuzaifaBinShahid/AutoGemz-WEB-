import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/svgs/auctions/Filter";
import DataTable from "../components/common/DataTable";

interface PaymentRefund {
  id: number;
  car: {
    image: string;
    model: string;
  };
  seller: string;
  transactionId: string;
  amount: string;
  status: "PAID" | "PENDING" | "REFUND";
  date: string;
}

const PaymentsRefunds = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const paymentsRefunds: PaymentRefund[] = [
    {
      id: 1,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2023 Ford Mustang GT",
      },
      seller: "AUTOHAUS MOTORS",
      transactionId: "TXN-29384",
      amount: "PKR 850,000",
      status: "PAID",
      date: "02 Nov 2025",
    },
    {
      id: 2,
      car: {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        model: "2020 Corolla Altis",
      },
      seller: "PRIVATE SELLER",
      transactionId: "TXN-11245",
      amount: "PKR 400,000",
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
      transactionId: "TXN-88922",
      amount: "PKR 50,000",
      status: "REFUND",
      date: "29 Oct 2025",
    },
  ];

  const statusColors: Record<PaymentRefund["status"], string> = {
    PAID: "#3EB549",
    PENDING: "#F59E0B",
    REFUND: "#DC3729",
  };

  const columns = [
    {
      key: "car",
      label: "CAR / SELLER",
      render: (value: PaymentRefund["car"], row: PaymentRefund) => (
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
      key: "transactionId",
      label: "TRANSACTION ID",
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: "amount",
      label: "AMOUNT",
      render: (value: string) => (
        <span className="text-gray-900 font-medium">{value}</span>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (value: PaymentRefund["status"]) => (
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
            Recent Payments & Refunds
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
          data={paymentsRefunds}
          onRowClick={(row) => navigate(`/payments-refunds/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default PaymentsRefunds;
