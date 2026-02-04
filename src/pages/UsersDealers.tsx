import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import DataTable from "../components/common/DataTable";
import Filter from "../components/svgs/auctions/Filter";
import { userService } from "../services/userService";
import StatusModal from "../components/common/StatusModal";

interface UserDealer {
  id: string;
  profile: {
    image: string;
    name: string;
  };
  role: "DEALER" | "BUYER";
  email: string;
  phone: string;
  kycStatus: "VERIFIED" | "PENDING KYC" | "REJECTED";
  joinedOn: string;
  isActive: boolean;
}

const UsersDealers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const page = 1;
  const limit = 10;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [statusModalConfig, setStatusModalConfig] = useState<{
    isOpen: boolean;
    userId: string | null;
    userName: string;
    action: "BLACKLIST" | "RESTORE";
  }>({
    isOpen: false,
    userId: null,
    userName: "",
    action: "BLACKLIST",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userService.getUsers({ page, limit, sortBy: 'createdAt:desc' }),
  });

  const blacklistMutation = useMutation({
    mutationFn: (userId: string) => userService.blacklistUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("User blacklisted successfully");
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to blacklist user");
    },
  });

  const restoreMutation = useMutation({
    mutationFn: (userId: string) => userService.restoreUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("User restored successfully");
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to restore user");
    },
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, row: UserDealer) => {
    e.stopPropagation();
    const newValue = e.target.value === "active";
    if (newValue === row.isActive) return;

    setStatusModalConfig({
      isOpen: true,
      userId: row.id,
      userName: row.profile.name,
      action: newValue ? "RESTORE" : "BLACKLIST",
    });
  };

  const handleCloseModal = () => {
    setStatusModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirmStatusChange = () => {
    if (!statusModalConfig.userId) return;

    if (statusModalConfig.action === "BLACKLIST") {
      blacklistMutation.mutate(statusModalConfig.userId);
    } else {
      restoreMutation.mutate(statusModalConfig.userId);
    }
  };

  const formatUserData = (users: any[]): UserDealer[] => {
    return users.map((user) => ({
      id: user.id,
      profile: {
        image: user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`,
        name: user.fullName,
      },
      role: user.role === 'dealer' ? 'DEALER' : 'BUYER',
      email: user.email,
      phone: user.phone || '03xx xxxxxxx',
      kycStatus: user.isEmailVerified ? 'VERIFIED' : 'PENDING KYC',
      joinedOn: new Date(user.lastLogin || new Date()).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      isActive: user.isActive !== false, // Default to true if not specified
    }));
  };

  const usersDealers: UserDealer[] = data?.results ? formatUserData(data.results) : [];

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
      key: "isActive",
      label: "STATUS",
      render: (_: boolean, row: UserDealer) => (
        <select
          value={row.isActive ? "active" : "inactive"}
          onChange={(e) => handleStatusChange(e, row)}
          onClick={(e) => e.stopPropagation()}
          className={`px-2 py-1 rounded border text-sm font-medium focus:outline-none focus:ring-1 focus:ring-autogemz-orange transition-colors ${
            row.isActive 
              ? "text-[#3EB549] border-[#3EB5491A] bg-[#3EB5490D]" 
              : "text-[#DC3729] border-[#DC37291A] bg-[#DC37290D]"
          }`}
        >
          <option value="active" className="text-[#3EB549] bg-white">Active</option>
          <option value="inactive" className="text-[#DC3729] bg-white">Inactive</option>
        </select>
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

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-100 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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
            <p className="text-red-500 text-lg">❌ Error loading users. Please try again.</p>
          </div>
        ) : usersDealers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={usersDealers}
            onRowClick={(row) => navigate(`/users-dealers/${row.id}`)}
          />
        )}
      </div>

      <StatusModal
        isOpen={statusModalConfig.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStatusChange}
        title={statusModalConfig.action === "BLACKLIST" ? "BLACKLIST USER?" : "RESTORE USER?"}
        message={`Are you sure you want to ${statusModalConfig.action.toLowerCase()} ${statusModalConfig.userName}?`}
        confirmText={statusModalConfig.action}
        type={statusModalConfig.action === "BLACKLIST" ? "danger" : "success"}
      />
    </div>
  );
};

export default UsersDealers;
