import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import AdminActionsModal from "../components/common/AdminActionsModal";
import CalenderIcon from "../components/svgs/CalenderIcon";
import CarSpecification from "../components/PaymentDetails/CarSpecification";
import ContactInformation from "../components/InstantOfferDetails/ContactInformation";

interface InstantOffer {
  id: number;
  car: {
    image: string;
    model: string;
  };
  seller: string;
  offerId: string;
  estimatedValue: string;
  status: "NEW" | "PENDING" | "REVIEW" | "APPROVED" | "REJECTED";
  date: string;
}

const InstantOfferDetails = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdminActionsModalOpen, setIsAdminActionsModalOpen] = useState(false);

  const instantOffer: InstantOffer = {
    id: 1,
    car: {
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
      model: "2023 Ford Mustang GT",
    },
    seller: "AUTOHAUS MOTORS",
    offerId: "IO-77102",
    estimatedValue: "PKR 850,000",
    status: "APPROVED",
    date: "02 Nov 2025",
  };

  const statusColors: Record<InstantOffer["status"], string> = {
    NEW: "#19ADD9",
    PENDING: "#F59E0B",
    REVIEW: "#2DD4BF",
    APPROVED: "#3EB549",
    REJECTED: "#DC3729",
  };

  const handleEditClick = () => {
    setIsAdminActionsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    navigate("/instant-offer");
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
          <h2 className="text-xl font-semibold text-gray-900">Car & Seller Summary</h2>
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
              src={instantOffer.car.image}
              alt={instantOffer.car.model}
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
            <h3 className="text-3xl font-bold text-gray-900 uppercase">
              {instantOffer.car.model}
            </h3>
            <p className="text-gray-500">{instantOffer.offerId}</p>

            <div className="border border-[#1F29371A] w-full my-4"></div>

            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-3">
                <CalenderIcon />
                <span className="text-black text-[18px] uppercase">{instantOffer.date}</span>
              </div>

              <span
                className="inline-block px-3 py-1 rounded text-sm font-medium text-white w-fit"
                style={{ backgroundColor: statusColors[instantOffer.status] }}
              >
                {instantOffer.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-black">
                SELLER: <span className="font-normal">{instantOffer.seller}</span>
              </p>
              <p className="text-lg font-semibold text-black">
                ESTIMATED VALUE: <span className="font-normal">{instantOffer.estimatedValue}</span>
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
          transactionId="IO-77102"
          description="Alloy rims, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint."
        />
      </div>

      <div className="mt-6">
        <ContactInformation
          mobileNumber="03XXXXXXXXX"
          secondaryNumber="03YYYYYYYYY"
          allowWhatsApp={true}
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
        title="DELETE OFFER?"
        message="Are you sure you want to delete this offer?"
      />
    </div>
  );
};

export default InstantOfferDetails;
