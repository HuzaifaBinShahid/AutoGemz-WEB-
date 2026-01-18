import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import AdminActionsModal from "../components/common/AdminActionsModal";
import CarSpecification from "../components/PaymentDetails/CarSpecification";
import BidActivity from "../components/AuctionDetails/BidActivity";
import BuyerInformation from "../components/PaymentDetails/BuyerInformation";
import LocationIcon from "../components/svgs/LocationIcon";

interface Auction {
  id: number;
  car: {
    image: string;
    model: string;
  };
  auctionId: string;
  seller: string;
  highestBid: string;
  endsIn: string;
  location: string;
  status: "LIVE" | "PENDING REVIEW" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
}

const AuctionDetails = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdminActionsModalOpen, setIsAdminActionsModalOpen] = useState(false);

  const auction: Auction = {
    id: 1,
    car: {
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
      model: "TOYOTA COROLLA HATCHBACK MID-SPEC",
    },
    auctionId: "AUC-23984",
    seller: "@zainaauto",
    highestBid: "PKR 2,850,000",
    endsIn: "01H 12M",
    location: "Lahore",
    status: "LIVE",
  };

  const statusColors: Record<Auction["status"], string> = {
    LIVE: "#29DC9780",
    "PENDING REVIEW": "#F59E0B",
    SCHEDULED: "#19ADD9",
    COMPLETED: "#3EB549",
    CANCELLED: "#DC3729",
  };

  const bids = [
    {
      id: 1,
      rank: 61,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Ahmed+Saleem&background=random",
        name: "Ahmed Saleem",
      },
      bid: "12,00,00",
      placed: "39 minutes ago",
    },
    {
      id: 2,
      rank: 62,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Sara+Charle&background=random",
        name: "Sara Charle",
      },
      bid: "11,00,00",
      placed: "02 minutes ago",
    },
    {
      id: 3,
      rank: 63,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Harry+Lincons&background=random",
        name: "Harry Lincons",
      },
      bid: "10,00,00",
      placed: "09 minutes ago",
    },
    {
      id: 4,
      rank: 64,
      bidder: {
        image: "https://ui-avatars.com/api/?name=Mehew+Jame&background=random",
        name: "Mehew Jame",
        isYou: true,
      },
      bid: "9,00,00",
      placed: "30 minutes ago",
    },
  ];

  const handleEditClick = () => {
    setIsAdminActionsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    navigate("/auctions");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleAdminActionConfirm = (action: string) => {
    console.log("Selected action:", action);
  };

  const handleAdminActionsClose = () => {
    setIsAdminActionsModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div
        className="bg-white p-6"
        style={{
          boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
          borderRadius: "0",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl font-semibold text-gray-900 uppercase"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "0.14em",
              verticalAlign: "middle",
            }}
          >
            Auction Details
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleEditClick}
              className="px-4 text-[14px] uppercase font-semibold text-white transition-colors bg-autogemz-orange"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <DeleteIcon />
            </button>

          </div>
        </div>

        <div className="border border-[#1F29371A] w-full my-4"></div>

        <div className="flex">
          <div className="shrink-0">
            <img
              src={auction.car.image}
              alt={auction.car.model}
              className="w-full max-w-md h-full object-cover"
            />
          </div>
          <div
            style={{
              width: "1px",
              backgroundColor: "#1F29371A",
            }}
          />
          <div className="flex-1 flex flex-col gap-4 pl-6">



            <div className="flex justify-between items-center">
              <div>
                <h3
                  className="text-3xl font-bold text-gray-900 uppercase"
                  style={{
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    verticalAlign: "middle",
                  }}
                >
                  {auction.car.model}
                </h3>
                <p className="text-gray-500">{auction.auctionId}</p>
              </div>


              <p
                className="inline-block px-4 py-2 rounded-xl text-sm font-medium text-black border border-[#29DC9780]"
                style={{ backgroundColor: statusColors[auction.status] }}
              >
                {auction.status}
              </p>
            </div>






            <div className="border border-[#1F29371A] w-full my-4"></div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p
                    className="text-lg font-semibold text-[#A5A5A5] uppercase"
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "32px",
                      letterSpacing: "0.14em",
                      verticalAlign: "middle",
                    }}
                  >
                    Seller
                  </p>
                  <p className="text-black text-[20px] font-semibold">{auction.seller}</p>
                </div>


                <div className="flex items-center gap-2">
                  <LocationIcon />
                  <span className="text-black text-[30px] font-semibold">{auction.location}</span>
                </div>
              </div>


              <p
                className="text-xl font-semibold text-black uppercase"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "0.14em",
                  verticalAlign: "middle",
                }}
              >
                HIGHEST BID:   <span>{auction.highestBid}</span>
              </p>

              <p
                className="text-xl font-semibold text-black uppercase"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "0.14em",
                  verticalAlign: "middle",
                }}
              >
                ENDS IN: <span>{auction.endsIn}</span>
              </p>

            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CarSpecification
          make="Toyota"
          model="Corolla Altis"
          mileage="106905"
          year={2018}
          mileageKm="72,000 km"
          transmission="Automatic"
          registration="Lahore"
          transactionId="INSP-10457"
        />
      </div>

      <div className="mt-6">
        <BidActivity bids={bids} timeRemaining="1H 45M 3S" />
      </div>

      <div className="mt-6">
        <BuyerInformation
          name="Alex"
          avatar="https://ui-avatars.com/api/?name=Alex&background=random"
          contact="03XXXXXXXXX"
          email="zaina@example.com"
          location="Lahore"
        />
      </div>

      <AdminActionsModal
        isOpen={isAdminActionsModalOpen}
        onClose={handleAdminActionsClose}
        onConfirm={handleAdminActionConfirm}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="DELETE AUCTION?"
        message="Are you sure you want to delete this auction?"
      />
    </div>
  );
};

export default AuctionDetails;
