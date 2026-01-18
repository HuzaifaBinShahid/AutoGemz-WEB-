import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import AdminActionsModal from "../components/common/AdminActionsModal";
import CalenderIcon from "../components/svgs/CalenderIcon";
import CarSpecification from "../components/PaymentDetails/CarSpecification";
import PaymentBreakdown from "../components/PaymentDetails/PaymentBreakdown";
import PaymentHistory from "../components/PaymentDetails/PaymentHistory";
import BuyerInformation from "../components/PaymentDetails/BuyerInformation";

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

const PaymentRefundDetails = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdminActionsModalOpen, setIsAdminActionsModalOpen] = useState(false);

  const paymentRefund: PaymentRefund = {
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
  };

  const statusColors: Record<PaymentRefund["status"], string> = {
    PAID: "#3EB549",
    PENDING: "#F59E0B",
    REFUND: "#DC3729",
  };

  const handleEditClick = () => {
    setIsAdminActionsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    navigate("/payments-refunds");
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
          <h2 className="text-xl font-semibold text-gray-900">
            {paymentRefund.status === "REFUND" ? "REFUND DETAILS" : "Payment Details"}
          </h2>
          <div className="flex gap-3">
            {paymentRefund.status === "REFUND" ? (
              <>
                <button
                  className="px-4 py-2 text-[14px] uppercase font-semibold text-autogemz-orange border-2 border-autogemz-orange bg-white transition-colors hover:bg-gray-50"
                >
                  REJECT REFUND
                </button>
                <button
                  className="px-4 py-2 text-[14px] uppercase font-semibold text-white bg-autogemz-orange transition-colors hover:bg-opacity-90"
                >
                  APPROVE REFUND
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="border border-[#1F29371A] w-full my-4"></div>

        <div className="flex">
          <div className="shrink-0">
            <img
              src={paymentRefund.car.image}
              alt={paymentRefund.car.model}
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
              {paymentRefund.car.model}
            </h3>
            <p className="text-gray-500">{paymentRefund.transactionId}</p>

            <div className="border border-[#1F29371A] w-full my-4"></div>

            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-3">
                <CalenderIcon />
                <span className="text-[black] text-[18px] uppercase">{paymentRefund.date}</span>
              </div>

              {paymentRefund.status === "REFUND" && (
                <span
                  className="inline-block px-3 py-1 rounded text-sm font-medium text-white w-fit"
                  style={{ backgroundColor: statusColors["PENDING"] }}
                >
                  PENDING
                </span>
              )}
              {paymentRefund.status !== "REFUND" && (
                <span
                  className="inline-block px-3 py-1 rounded text-sm font-medium text-white w-fit"
                  style={{ backgroundColor: statusColors[paymentRefund.status] }}
                >
                  {paymentRefund.status}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-[#000000] uppercase">AMOUNT:</p>
              <p className="text-2xl font-semibold text-[#000000] uppercase">{paymentRefund.amount}</p>
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
          transactionId="TXN-29384"
        />
      </div>

      <div className="mt-6">
        <PaymentBreakdown
          totalAmount="PKR 850,000"
          amountPaid="PKR 850,000"
          returnAmount="PKR 50,000"
          remainingBalance="PKR 0"
          paymentMethod="Bank Transfer"
          referenceNo="REF-11245"
        />
      </div>

      <div className="mt-6">
        <PaymentHistory
          payments={[
            {
              date: "02 Nov 2025",
              amount: "PKR 850,000",
              status: "COMPLETED",
              transactionId: "TXN-29384",
            },
            {
              date: "30 Oct 2025",
              amount: "PKR 400,000",
              status: "REFUNDED",
              transactionId: "TXN-11245",
            },
            {
              date: "28 Sep 2025",
              amount: "PKR 300,000",
              status: "PENDING",
              transactionId: "TXN-98875",
            },
          ]}
        />
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
        title="DELETE PAYMENT?"
        message="Are you sure you want to delete this payment?"
      />
    </div>
  );
};

export default PaymentRefundDetails;
