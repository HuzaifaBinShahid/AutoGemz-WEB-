import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import DeleteIcon from "../components/svgs/DeleteIcon";
import EditIcon from "../components/svgs/EditIcon";
import DeleteModal from "../components/common/DeleteModal";
import { userService } from "../services/userService";

interface AuctionHistory {
  id: number;
  car: {
    image: string;
    model: string;
  };
  auctionId: string;
  dateCreated: string;
  status: "COMPLETED" | "CANCELLED" | "PENDING";
  highestBid: string;
  endsIn: string;
}

interface UserDealer {
  id: string;
  profile: {
    image: string;
    name: string;
  };
  role: "DEALER" | "BUYER";
  email: string;
  phone: string;
  username: string;
  gender: string | null;
  dateOfBirth: string | null;
  country: string | null;
  city: string;
  joinedOn: string;
  auctionHistory: AuctionHistory[];
}

const UserDealerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    city: "",
  });

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => userService.updateUser(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      toast.success("User updated successfully");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update user");
    },
  });

  useEffect(() => {
    if (userData) {
      setEditForm({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        username: userData.username || "",
        gender: userData.gender || "",
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : "",
        country: userData.country || "",
        city: userData.city || "",
      });
    }
  }, [userData]);

  const formatUserData = (user: any): UserDealer => {
    return {
      id: user.id,
      profile: {
        image: user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`,
        name: user.fullName,
      },
      role: user.role === 'dealer' ? 'DEALER' : 'BUYER',
      email: user.email,
      phone: user.phone || '03xx xxxxxxxx',
      username: user.username || "",
      gender: user.gender || null,
      dateOfBirth: user.dateOfBirth || null,
      country: user.country || null,
      city: user.city || 'N/A',
      joinedOn: new Date(user.lastLogin || new Date()).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      auctionHistory: [],
    };
  };

  const userDealer: UserDealer | null = userData ? formatUserData(userData) : null;

  const getStatusColor = (status: AuctionHistory["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "#3EB549";
      case "CANCELLED":
        return "#DC3729";
      case "PENDING":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    navigate("/users-dealers");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateMutation.mutate(editForm);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F2F2F2] min-h-screen">
        <div className="bg-white p-6" style={{ boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A" }}>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !userDealer) {
    return (
      <div className="p-6 bg-[#F2F2F2] min-h-screen">
        <div className="bg-white p-6 text-center" style={{ boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A" }}>
          <p className="text-6xl mb-4">❌</p>
          <p className="text-red-500 text-lg">Error loading user details. User not found.</p>
          <button onClick={() => navigate("/users-dealers")} className="mt-4 px-4 py-2 bg-autogemz-orange text-white rounded hover:bg-opacity-90">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div className="space-y-6">
        <div
          className="bg-white p-6"
          style={{
            boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
            borderRadius: "0",
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {userDealer.role === "DEALER" ? "Dealer Details" : "User Details"}
            </h2>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="p-2 rounded transition-colors bg-autogemz-orange hover:bg-opacity-90"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="p-2 rounded transition-colors bg-[#DC3729] hover:bg-opacity-90"
                  >
                    <DeleteIcon />
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="px-4 py-2 bg-autogemz-orange text-white rounded hover:bg-opacity-90 disabled:opacity-50"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-6">
            <img
              src={userDealer.profile.image}
              alt={userDealer.profile.name}
              className="w-24 h-24 object-cover rounded-full"
            />
            <div className="flex-1">
              {!isEditing ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl font-bold text-gray-900">
                      {userDealer.profile.name.toUpperCase()}
                    </h3>
                    <span
                      className="inline-block px-3 py-1 text-sm font-medium text-gray-700"
                      style={{ backgroundColor: "#F2F2F2" }}
                    >
                      {userDealer.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="text-gray-900 font-medium">{userDealer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="text-gray-900 font-medium">{userDealer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">City</p>
                      <p className="text-gray-900 font-medium">{userDealer.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Joined On</p>
                      <p className="text-gray-900 font-medium">{userDealer.joinedOn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Username</p>
                      <p className="text-gray-900 font-medium">{userDealer.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Gender</p>
                      <p className="text-gray-900 font-medium">{userDealer.gender || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Country</p>
                      <p className="text-gray-900 font-medium">{userDealer.country || "Not specified"}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editForm.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                    <select
                      name="gender"
                      value={editForm.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editForm.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">City</label>
                    <input
                      type="text"
                      name="city"
                      value={editForm.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={editForm.country}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="bg-white p-6"
          style={{
            boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
            borderRadius: "0",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-autogemz-orange"></div>
            <h2 className="text-xl font-semibold text-gray-900">AUCTION HISTORY</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    className="text-left py-3 px-4 font-medium"
                    style={{ color: "#1F293799" }}
                  >
                    CAR
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium"
                    style={{ color: "#1F293799" }}
                  >
                    AUCTION ID
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium"
                    style={{ color: "#1F293799" }}
                  >
                    DATE CREATED
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium"
                    style={{ color: "#1F293799" }}
                  >
                    STATUS
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium"
                    style={{ color: "#1F293799" }}
                  >
                    HIGHEST BID
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium"
                    style={{ color: "#1F293799" }}
                  >
                    ENDS IN
                  </th>
                </tr>
              </thead>
              <tbody>
                {userDealer.auctionHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <p className="text-6xl mb-4">📋</p>
                      <p className="text-gray-500 text-lg">No auction history found</p>
                    </td>
                  </tr>
                ) : (
                  userDealer.auctionHistory.map((auction) => (
                    <tr
                      key={auction.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={auction.car.image}
                            alt={auction.car.model}
                            className="w-12 h-12 object-cover"
                          />
                          <p className="font-medium text-gray-900">
                            {auction.car.model}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{auction.auctionId}</td>
                      <td className="py-4 px-4 text-gray-700">{auction.dateCreated}</td>
                      <td className="py-4 px-4">
                        <span
                          className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
                          style={{ backgroundColor: getStatusColor(auction.status) }}
                        >
                          {auction.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium">
                        {auction.highestBid}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{auction.endsIn}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="DELETE USER?"
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UserDealerDetails;
