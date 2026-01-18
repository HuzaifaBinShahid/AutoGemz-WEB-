import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/common/DataTable";
import Filter from "../components/svgs/auctions/Filter";

interface UserDealer {
  id: number;
  profile: {
    image: string;
    name: string;
  };
  role: "DEALER" | "BUYER";
  email: string;
  phone: string;
  kycStatus: "VERIFIED" | "PENDING KYC" | "REJECTED";
  joinedOn: string;
}

const UsersDealers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const usersDealers: UserDealer[] = [
    {
      id: 1,
      profile: {
        image: "https://ui-avatars.com/api/?name=Alex&background=random",
        name: "Alex",
      },
      role: "DEALER",
      email: "ali.motors@e...",
      phone: "03xx xxxxxxx",
      kycStatus: "VERIFIED",
      joinedOn: "12 Nov",
    },
    {
      id: 2,
      profile: {
        image: "https://ui-avatars.com/api/?name=Sara+Khan&background=random",
        name: "Sara Khan",
      },
      role: "BUYER",
      email: "sara.khan@e...",
      phone: "03xx xxxxxxx",
      kycStatus: "PENDING KYC",
      joinedOn: "10 Nov",
    },
    {
      id: 3,
      profile: {
        image: "https://ui-avatars.com/api/?name=AutoHub&background=random",
        name: "AutoHub",
      },
      role: "BUYER",
      email: "autohub@e...",
      phone: "03xx xxxxxxx",
      kycStatus: "REJECTED",
      joinedOn: "08 Nov",
    },
  ];

  const getKycStatusColor = (status: UserDealer["kycStatus"]) => {
    switch (status) {
      case "VERIFIED":
        return "#3EB549";
      case "PENDING KYC":
        return "#F59E0B";
      case "REJECTED":
        return "#DC3729";
      default:
        return "#6B7280";
    }
  };

  const getRoleColor = () => {
    return "#6B7280";
  };

  const columns = [
    {
      key: "profile",
      label: "PROFILE",
      render: (value: UserDealer["profile"]) => (
        <div className="flex items-center gap-3">
          <img
            src={value.image}
            alt={value.name}
            className="w-12 h-12 object-cover rounded-full"
          />
          <p className="font-medium text-gray-900">{value.name}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "ROLE",
      render: (value: UserDealer["role"]) => (
        <span
          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
          style={{ backgroundColor: getRoleColor() }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "phone",
      label: "PHONE",
    },
    {
      key: "kycStatus",
      label: "KYC STATUS",
      render: (value: UserDealer["kycStatus"]) => (
        <span
          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
          style={{ backgroundColor: getKycStatusColor(value) }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "joinedOn",
      label: "JOINED ON",
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
            Users & Dealers
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
          data={usersDealers}
          onRowClick={(row) => navigate(`/users-dealers/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default UsersDealers;
