import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";

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
  id: number;
  profile: {
    image: string;
    name: string;
  };
  role: "DEALER" | "BUYER";
  email: string;
  phone: string;
  city: string;
  joinedOn: string;
  auctionHistory: AuctionHistory[];
}

const UserDealerDetails = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const userDealer: UserDealer = {
    id: 1,
    profile: {
      image: "https://ui-avatars.com/api/?name=Alex&background=random",
      name: "Alex",
    },
    role: "DEALER",
    email: "ali.motors@example.com",
    phone: "03xx xxxxxxxx",
    city: "Lahore",
    joinedOn: "12 Nov 2025",
    auctionHistory: [
      {
        id: 1,
        car: {
          image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
          model: "2020 Corolla Altis",
        },
        auctionId: "AC-98234",
        dateCreated: "25 Oct 2025",
        status: "COMPLETED",
        highestBid: "PKR 1,500,000",
        endsIn: "Ended",
      },
      {
        id: 2,
        car: {
          image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
          model: "2020 Corolla Altis",
        },
        auctionId: "AC-98234",
        dateCreated: "25 Oct 2025",
        status: "CANCELLED",
        highestBid: "PKR 1,500,000",
        endsIn: "Ended",
      },
      {
        id: 3,
        car: {
          image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
          model: "2020 Corolla Altis",
        },
        auctionId: "AC-98234",
        dateCreated: "25 Oct 2025",
        status: "PENDING",
        highestBid: "PKR 1,500,000",
        endsIn: "Ended",
      },
    ],
  };

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
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded transition-colors"
            >
             <DeleteIcon />
            </button>
          </div>

          <div className="flex items-start gap-6">
            <img
              src={userDealer.profile.image}
              alt={userDealer.profile.name}
              className="w-24 h-24 object-cover rounded-full"
            />
            <div className="flex-1">
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
                  <p className="text-gray-900">{userDealer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-900">{userDealer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">City</p>
                  <p className="text-gray-900">{userDealer.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Joined On</p>
                  <p className="text-gray-900">{userDealer.joinedOn}</p>
                </div>
              </div>
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
                {userDealer.auctionHistory.map((auction) => (
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
                ))}
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
