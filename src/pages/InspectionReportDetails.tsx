import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import AdminActionsModal from "../components/common/AdminActionsModal";
import CarSpecification from "../components/PaymentDetails/CarSpecification";
import OverallRating from "../components/InspectionDetails/OverallRating";
import InspectionCategories from "../components/InspectionDetails/InspectionCategories";
import LocationIcon from "../components/svgs/LocationIcon";
import CarInspection from "../components/InspectionDetails/CarInspection";
import VehiclePictures from "../components/InspectionDetails/VehiclePictures";
import CommentsDisclaimer from "../components/InspectionDetails/CommentsDisclaimer";
import ExteriorCondition from "../components/InspectionDetails/ExteriorCondition";

interface InspectionReport {
  id: number;
  car: {
    image: string;
    model: string;
  };
  inspectionId: string;
  location: string;
  inspector: string;
  status: "PENDING" | "PASSED" | "FAILED";
  scheduledOn: string;
  completedOn: string | null;
  rating: number;
}

const InspectionReportDetails = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdminActionsModalOpen, setIsAdminActionsModalOpen] = useState(false);

  const inspectionReport: InspectionReport = {
    id: 1,
    car: {
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
      model: "TOYOTA COROLLA HATCHBACK MID-SPEC",
    },
    inspectionId: "INSP 10457",
    location: "Lahore",
    inspector: "Ahmed Raza",
    status: "PENDING",
    scheduledOn: "26 Oct 2025",
    completedOn: null,
    rating: 5.74,
  };

  const handleEditClick = () => {
    setIsAdminActionsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    navigate("/inspection-report");
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
          <h2 className="text-xl font-semibold text-gray-900">Auction Car Details</h2>
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
              src={inspectionReport.car.image}
              alt={inspectionReport.car.model}
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
              {inspectionReport.car.model}
            </h3>

            <div className="flex items-center gap-2">
              <LocationIcon />
              <span className="text-black">{inspectionReport.location}</span>
            </div>

            <div className="mt-4">
              <h4 className="text-[24px] font-semibold text-gray-900 mb-4 border-l-4 border-autogemz-orange pl-4">OVERALL RATING</h4>
              <OverallRating rating={inspectionReport.rating} maxRating={10} />
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
          transactionId={inspectionReport.inspectionId}
        />
      </div>

      <div className="mt-6">

        <div className="mt-6">
          <CarInspection
            items={[
              { name: "AC / HEATER", percentage: 90 },
              { name: "ENGINE / TRANSMISSION / CLUTCH", percentage: 85 },
              { name: "EXTERIOR", percentage: 95 },
              { name: "SKELETON", percentage: 95 },
              { name: "ACCIDENT CHECKLIST", percentage: 95 },
              { name: "BRAKES", percentage: 90 },
              { name: "SUSPENSION/STEERING", percentage: 85 },
              { name: "INTERIOR", percentage: 95 },
              { name: "ELECTRICAL & ELECTRONICS", percentage: 95 },
              { name: "TYRES", percentage: 95 },
            ]}
          />
        </div>

        <div className="mt-6">
        <ExteriorCondition
          image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"
          tag="W2"
          label="CAR ROOF"
        />
      </div>

        <InspectionCategories
          categories={[
            {
              title: "AC / HEATER",
              status: "AC / HEATER CHECK UP",
              percentage: 100,
              items: [
                { label: "AC Fitted", status: "Yes", statusType: "green" },
                { label: "Blower", status: "Excellent Air Throw", statusType: "green" },
                { label: "Heating", status: "Excellent", statusType: "green" },
                { label: "Cooling", status: "Excellent", statusType: "green" },
                { label: "AC Operational", status: "Yes", statusType: "green" },
              ],
            },
            {
              title: "BREAKS",
              status: "MACHENICAL CHECK",
              percentage: 80,
              items: [
                { label: "Front Right Disc", status: "Linings", statusType: "red" },
                { label: "Front Left Disc", status: "Linings", statusType: "red" },
                { label: "Front Right Brake Pad", status: "More than 50%", statusType: "green" },
                { label: "Front Left Brake Pad", status: "More than 50%", statusType: "green" },
                { label: "Parking / Hand Brake", status: "Okay", statusType: "green" },
              ],
            },
            {
              title: "ELECTRICAL & ELECTRONICS",
              status: "CHECK UP",
              percentage: 80,
              subSections: [
                {
                  title: "Computer Check up",
                  items: [
                    { label: "Computer Check up / Malfunction Check", status: "Error", statusType: "red" },
                    { label: "Rear View Camera", status: "Working", statusType: "green", hasViewButton: true },
                  ],
                },
                {
                  items: [
                    { label: "Battery Warning Light", status: "Not Present", statusType: "green" },
                    { label: "Oil Pressure Low Warning Light", status: "Not Present", statusType: "green" },
                    { label: "Temperature Warning Light / Gauge", status: "Not Present", statusType: "green" },
                    { label: "Gauges", status: "Working", statusType: "green" },
                    { label: "Air Bag Warning Light", status: "Present", statusType: "red" },
                    { label: "Power Steering Warning Light", status: "Not Present", statusType: "green", hasViewButton: true },
                    { label: "ABS Warning Light", status: "Not Present", statusType: "green" },
                    { label: "Key Fob Battery Low Light", status: "Not Present", statusType: "green" },
                  ],
                },
                {
                  title: "Battery",
                  items: [
                    { label: "Voltage", status: "12 cc", statusType: "green" },
                    { label: "Terminal Condition", status: "Ok", statusType: "green", hasViewButton: true },
                    { label: "Charging", status: "Ok", statusType: "green" },
                    { label: "Alternator Operation", status: "Ok", statusType: "green", hasViewButton: true },
                  ],
                },
              ],
            },
            {
              title: "INTERIOR",
              status: "CHECK UP",
              percentage: 85,
              items: [],
            },
            {
              title: "EXTERIOR/BODY",
              status: "CHECK LIST",
              percentage: 42,
              items: [],
            },
            {
              title: "TYRES",
              status: "CHECK UP",
              percentage: 85,
              items: [],
            },
            {
              title: "TEST DRIVE",
              status: "CHECK LIST",
              percentage: 42,
              items: [],
            },
          ]}
        />
      </div>

      <div className="mt-6">
        <VehiclePictures
          pictures={[
            { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", label: " Front View Image" },
            { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", label: " Front View Image" },
            { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", label: " Front View Image" },
            { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", label: " Front View Image" },
            { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", label: " Front View Image" },
            { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", label: " Front View Image" },
          ]}
        />
      </div>

      <CommentsDisclaimer
        comments={[
          "Engine average Suspension work required AC blower noisy Both pillar showered Front windscreen change Airbag open Airbag light alteration Tyres need to be change Paint buff on all door frame",
        ]}
        disclaimer="This report estimates the vehicle's condition on the certification date, based on visible parts' working status. Unseen or uninspected parts are not considered. Odometer reading is relied upon, and famewheels.com is not accountable for its verification. The report is subjective, not a commitment on the car's condition. famewheels.com and its associates are not liable for any consequences arising from its use."
      />

      <AdminActionsModal
        isOpen={isAdminActionsModalOpen}
        onClose={handleAdminActionsClose}
        onConfirm={handleAdminActionConfirm}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="DELETE INSPECTION REPORT?"
        message="Are you sure you want to delete this inspection report?"
      />
    </div>
  );
};

export default InspectionReportDetails;
