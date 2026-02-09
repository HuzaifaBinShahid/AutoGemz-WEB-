import SettingsInput from "../components/common/SettingsInput";
import SettingsDropdown from "../components/common/SettingsDropdown";
import AddNewCarDetailsContent from "../components/AddNewCar/DetailsStepAccordion";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { inspectionService } from "../services/inspectionService";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import CarSpecification from "../components/PaymentDetails/CarSpecification";
import OverallRating from "../components/InspectionDetails/OverallRating";
import InspectionCategories from "../components/InspectionDetails/InspectionCategories";
import LocationIcon from "../components/svgs/LocationIcon";
import CarInspection from "../components/InspectionDetails/CarInspection";
import VehiclePictures from "../components/InspectionDetails/VehiclePictures";
import CommentsDisclaimer from "../components/InspectionDetails/CommentsDisclaimer";
const InspectionReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: report, isLoading, isError, error } = useQuery({
    queryKey: ['inspection-vehicle', id],
    queryFn: () => inspectionService.getInspectionVehicleById(id!),
    enabled: !!id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (payload: any) => inspectionService.updateInspectionSheet(id!, payload),
    onSuccess: () => {
      toast.success("Inspection report updated successfully");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['inspection-vehicle', id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update inspection report");
    },
  });

  useEffect(() => {
    if (report?.inspection) {
      setFormData(report.inspection);
    }
  }, [report]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message || "Error loading inspection details");
    }
  }, [isError, error]);


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


  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const calculatePercentage = (section: any) => {
    if (!section) return 0;
    const values = Object.values(section).filter(v => typeof v === 'boolean');
    if (values.length === 0) return 100;
    const trueValues = values.filter(v => v === true);
    return Math.round((trueValues.length / values.length) * 100);
  };

  if (isLoading) return <div className="p-6">Loading inspection details...</div>;
  if (isError || !report) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh] bg-white m-6 shadow-sm">
        <p className="text-6xl mb-4 grayscale opacity-20">📋</p>
        <p className="text-gray-400 text-xl font-medium">No inspection data found</p>
        <button 
          onClick={() => navigate('/inspection-report')}
          className="mt-4 px-4 py-2 bg-autogemz-orange text-white rounded font-semibold uppercase"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { vehicle, inspection } = report;

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
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    const { vehicleId, userId, id: inspectionId, ...rest } = formData;
                    updateMutation.mutate(rest);
                  }}
                  disabled={updateMutation.isPending}
                  className="px-6 py-2 text-[14px] uppercase font-semibold text-white transition-colors bg-autogemz-orange disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(inspection);
                  }}
                  className="px-6 py-2 text-[14px] uppercase font-semibold text-[#DC3729] border border-[#DC3729] transition-colors bg-white font-bold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 text-[14px] uppercase font-semibold text-white transition-colors bg-autogemz-orange"
              >
                Edit
              </button>
            )}
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
              src={vehicle.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
              alt={vehicle.model}
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
              {vehicle.make} {vehicle.model}
            </h3>

            <div className="flex items-center gap-2">
              <LocationIcon />
              <span className="text-black">{vehicle.city || vehicle.location || "N/A"}</span>
            </div>

            <div className="mt-4">
              <h4 className="text-[24px] font-semibold text-gray-900 mb-4 border-l-4 border-autogemz-orange pl-4">OVERALL RATING</h4>
              <OverallRating rating={vehicle.rating || 0} maxRating={10} />
            </div>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 space-y-6">
          <div className="bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 uppercase border-l-4 border-autogemz-orange pl-4">Inspection Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SettingsDropdown
                label="Status"
                value={formData?.status || "pending"}
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "partial", label: "Partial" },
                  { value: "completed", label: "Completed" }
                ]}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}
              />
            </div>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 uppercase border-l-4 border-autogemz-orange pl-4">Car Specification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SettingsInput
                label="Engine Type"
                value={formData?.carSpecification?.engineType || ""}
                onChange={(e) => handleInputChange("carSpecification", "engineType", e.target.value)}
              />
              <SettingsInput
                label="Mileage"
                type="number"
                value={formData?.carSpecification?.mileage || 0}
                onChange={(e) => handleInputChange("carSpecification", "mileage", Number(e.target.value))}
              />
               <SettingsInput
                label="Engine No"
                value={formData?.carSpecification?.engineNumber || ""}
                onChange={(e) => handleInputChange("carSpecification", "engineNumber", e.target.value)}
              />
              <SettingsInput
                label="Registration No"
                value={formData?.carSpecification?.registrationNumber || ""}
                onChange={(e) => handleInputChange("carSpecification", "registrationNumber", e.target.value)}
              />
              <SettingsInput
                label="Engine Capacity"
                value={formData?.carSpecification?.engineCapacity || ""}
                onChange={(e) => handleInputChange("carSpecification", "engineCapacity", e.target.value)}
              />
              <SettingsInput
                label="Chassis No"
                value={formData?.carSpecification?.chassisNumber || ""}
                onChange={(e) => handleInputChange("carSpecification", "chassisNumber", e.target.value)}
              />
            </div>
          </div>
          <AddNewCarDetailsContent formData={formData} onChange={handleInputChange} />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <CarSpecification
              make={vehicle.make || "N/A"}
              model={vehicle.model || "N/A"}
              mileage={inspection.carSpecification.mileage?.toString() || "0"}
              year={vehicle.year || 0}
              mileageKm={`${inspection.carSpecification.mileage?.toLocaleString() || 0} km`}
              transmission={inspection.carSpecification.transmissionType || vehicle.transmission || "Automatic"}
              registration={inspection.carSpecification.registeredCity || vehicle.city || "N/A"}
              transactionId={inspection.id || "N/A"}
            />
          </div>

          <div className="mt-6">
            <CarInspection
              items={[
                { name: "AC / HEATER", percentage: calculatePercentage(inspection.acHeater) },
                { name: "BRAKES", percentage: 90 },
                { name: "ELECTRICAL & ELECTRONICS", percentage: calculatePercentage(inspection.electricalElectronics) },
                { name: "EXTERIOR", percentage: inspection.exteriorCondition?.length > 0 ? 80 : 100 },
              ]}
            />
          </div>

          <div className="mt-6">
            <InspectionCategories
              categories={[
                {
                  title: "AC / HEATER",
                  status: "AC / HEATER CHECK UP",
                  percentage: calculatePercentage(inspection.acHeater),
                  items: [
                    { label: "AC Fitted", status: inspection.acHeater.acFitted ? "Yes" : "No", statusType: inspection.acHeater.acFitted ? "green" : "red" },
                    { label: "Blower", status: inspection.acHeater.blower ? "Excellent Air Throw" : "Poor", statusType: inspection.acHeater.blower ? "green" : "red" },
                    { label: "Heating", status: inspection.acHeater.heating ? "Excellent" : "Poor", statusType: inspection.acHeater.heating ? "green" : "red" },
                    { label: "Cooling", status: inspection.acHeater.cooling ? "Excellent" : "Poor", statusType: inspection.acHeater.cooling ? "green" : "red" },
                    { label: "AC Operational", status: inspection.acHeater.acOptional || "N/A", statusType: inspection.acHeater.acOptional === "Yes" ? "green" : "red" },
                  ],
                },
                {
                  title: "BRAKES",
                  status: "MECHANICAL CHECK",
                  percentage: 80,
                  items: [
                    { label: "Front Right Disc", status: inspection.brake.frontRightDisc || "N/A", statusType: "green" },
                    { label: "Front Left Disc", status: inspection.brake.frontLeftDisc || "N/A", statusType: "green" },
                    { label: "Front Right Brake Pad", status: inspection.brake.frontRightBrakePad || "N/A", statusType: "green" },
                    { label: "Front Left Brake Pad", status: inspection.brake.frontLeftBrakePad || "N/A", statusType: "green" },
                  ],
                },
                {
                  title: "ELECTRICAL & ELECTRONICS",
                  status: "CHECK UP",
                  percentage: calculatePercentage(inspection.electricalElectronics),
                  subSections: [
                    {
                      title: "Computer Check up",
                      items: [
                        { label: "Computer Check up / Malfunction Check", status: inspection.electricalElectronics.computerCheckup ? "Ok" : "Error", statusType: inspection.electricalElectronics.computerCheckup ? "green" : "red" },
                        { label: "Rear View Camera", status: inspection.electricalElectronics.rearViewCamera ? "Working" : "Not Working", statusType: inspection.electricalElectronics.rearViewCamera ? "green" : "red" },
                      ],
                    },
                    {
                      items: [
                        { label: "Battery Warning Light", status: inspection.electricalElectronics.batteringWarningLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.batteringWarningLight ? "green" : "red" },
                        { label: "Oil Pressure Low Warning Light", status: inspection.electricalElectronics.oilPressureLowWarningLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.oilPressureLowWarningLight ? "green" : "red" },
                        { label: "Temperature Warning Light", status: inspection.electricalElectronics.temperatureWarningLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.temperatureWarningLight ? "green" : "red" },
                        { label: "Gauges", status: inspection.electricalElectronics.gauges ? "Working" : "Not Working", statusType: inspection.electricalElectronics.gauges ? "green" : "red" },
                        { label: "Air Bag Warning Light", status: inspection.electricalElectronics.airBagWarningLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.airBagWarningLight ? "green" : "red" },
                        { label: "Power Steering Warning Light", status: inspection.electricalElectronics.powerSteeringWarningLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.powerSteeringWarningLight ? "green" : "red" },
                        { label: "ABS Warning Light", status: inspection.electricalElectronics.absWarningLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.absWarningLight ? "green" : "red" },
                        { label: "Key Fob Battery Low Light", status: inspection.electricalElectronics.keyFobBatteryLowLight ? "Not Present" : "Present", statusType: !inspection.electricalElectronics.keyFobBatteryLowLight ? "green" : "red" },
                      ],
                    },
                    {
                      title: "Battery",
                      items: [
                        { label: "Voltage", status: inspection.electricalElectronics.voltage || "N/A", statusType: "green" },
                        { label: "Terminal Condition", status: inspection.electricalElectronics.terminalCondition || "N/A", statusType: "green" },
                        { label: "Charging", status: inspection.electricalElectronics.charging ? "Ok" : "Error", statusType: inspection.electricalElectronics.charging ? "green" : "red" },
                        { label: "Alternator Operation", status: inspection.electricalElectronics.alternatorOperation ? "Ok" : "Error", statusType: inspection.electricalElectronics.alternatorOperation ? "green" : "red" },
                      ],
                    },
                  ],
                },
                {
                  title: "EXTERIOR CONDITION",
                  status: "CHECK LIST",
                  percentage: inspection.exteriorCondition?.length > 0 ? 80 : 100,
                  items: inspection.exteriorCondition?.map((cond: any) => ({
                    label: cond.name,
                    status: `${cond.markArea} - ${cond.selectIssue}`,
                    statusType: "green"
                  })) || [],
                },
              ]}
            />
          </div>

          <div className="mt-6">
            <VehiclePictures
              pictures={inspection.basicInformation.images?.map((url: string) => ({ image: url, label: "Vehicle Image" })) || []}
            />
          </div>

          <CommentsDisclaimer
            comments={[
              vehicle.description || "No additional comments provided.",
            ]}
            disclaimer="This report estimates the vehicle's condition on the certification date, based on visible parts' working status. Unseen or uninspected parts are not considered. Odometer reading is relied upon, and famewheels.com is not accountable for its verification. The report is subjective, not a commitment on the car's condition. famewheels.com and its associates are not liable for any consequences arising from its use."
          />
        </>
      )}


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
