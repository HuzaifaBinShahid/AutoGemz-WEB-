import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsInput from "../components/common/SettingsInput";
import SettingsDropdown from "../components/common/SettingsDropdown";
import ExteriorDesign from "../components/svgs/ExteriorDesign";
import AddIssueModal from "../components/common/AddIssueModal";
import MarkAreaModal from "../components/common/MarkAreaModal";
import AddNewCarDetailsContent from "../components/AddNewCar/DetailsStepAccordion";
import { inspectionService } from "../services/inspectionService";
import type { CreateInspectionPayload } from "../services/inspectionService";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

const steps = ["Info", "Details", "Submit"];

const yesNoOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const AddNewCar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAddIssueOpen, setIsAddIssueOpen] = useState(false);
  const [isMarkAreaOpen, setIsMarkAreaOpen] = useState(false);
  const [isSubmitSuccessOpen, setIsSubmitSuccessOpen] = useState(false);

  const [formData, setFormData] = useState<CreateInspectionPayload>({
    basicInformation: {
      model: "",
      city: "",
      images: [],
    },
    carSpecification: {
      inspectionDate: new Date().toISOString(),
      engineType: "",
      mileage: 0,
      engineNumber: "",
      registrationNumber: "",
      cngInstall: false,
      engineCapacity: "",
      chassisNumber: "",
      transmissionType: "",
      registeredCity: "",
      driveType: "",
      registeredYear: 0,
    },
    exteriorCondition: [],
    acHeater: {
      acFitted: true,
      heating: true,
      cooling: true,
      blower: true,
      acOptional: "",
    },
    brake: {
      frontRightDisc: "",
      frontRightDiscImage: "",
      frontLeftDisc: "",
      frontLeftDiscImage: "",
      frontRightBrakePad: "",
      frontRightBrakePadImage: "",
      frontLeftBrakePad: "",
      frontLeftBrakePadImage: "",
    },
    electricalElectronics: {
      computerCheckup: true,
      rearViewCamera: true,
      batteringWarningLight: true,
      oilPressureLowWarningLight: true,
      temperatureWarningLight: true,
      gauges: true,
      airBagWarningLight: true,
      powerSteeringWarningLight: true,
      absWarningLight: true,
      keyFobBatteryLowLight: true,
      voltage: "",
      terminalCondition: "",
      charging: true,
      alternatorOperation: true,
    },
    status: "pending",
  });

  const mutation = useMutation({
    mutationFn: (payload: CreateInspectionPayload) => 
      inspectionService.createInspectionSheet(payload),
    onSuccess: () => {
      setIsSubmitSuccessOpen(true);
      toast.success("Inspection sheet created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create inspection sheet");
    },
  });

  const handleInputChange = (section: keyof CreateInspectionPayload, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value,
      },
    }));
  };

  const handleAddIssue = (data: { name: string; markArea: string; issue: string; images: File[] }) => {
    const imageUrls = data.images.map(f => URL.createObjectURL(f));
    const newIssue = {
      name: data.name,
      markArea: data.markArea,
      selectIssue: data.issue,
      images: imageUrls,
    };
    setFormData(prev => ({
      ...prev,
      exteriorCondition: [...prev.exteriorCondition, newIssue]
    }));
  };

  const validateStep = (step: number) => {
    if (step === 0) {
      const { basicInformation, carSpecification } = formData;
      if (!basicInformation.model) {
        toast.error("Please enter the vehicle model");
        return false;
      }
      if (!basicInformation.city) {
        toast.error("Please enter the city");
        return false;
      }
      const requiredSpecFields = [
        { key: "engineType", label: "Engine Type" },
        { key: "engineNumber", label: "Engine Number" },
        { key: "registrationNumber", label: "Registration Number" },
        { key: "engineCapacity", label: "Engine Capacity" },
        { key: "chassisNumber", label: "Chassis Number" },
        { key: "transmissionType", label: "Transmission Type" },
        { key: "registeredCity", label: "Registered City" },
        { key: "driveType", label: "Drive Type" },
      ];

      for (const field of requiredSpecFields) {
        if (!(carSpecification as any)[field.key]) {
          toast.error(`Please fill the ${field.label}`);
          return false;
        }
      }

      if (carSpecification.mileage <= 0) {
        toast.error("Please enter a valid mileage");
        return false;
      }
    }

    if (step === 1) {
      const { acHeater, electricalElectronics } = formData;
      if (!acHeater.acOptional) {
        toast.error("Please specify AC Operational status");
        return false;
      }
      if (!electricalElectronics.voltage) {
        toast.error("Please enter Battery Voltage");
        return false;
      }
    }

    if (step === 2) {
      // Step 2 is now Submit, no specific validation beyond prior steps
      return true;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      mutation.mutate(formData);
    }
  };
  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div
        className="bg-white p-6"
        style={{
          boxShadow:
            "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
          borderRadius: "0",
        }}
      >
        <h1
          className="uppercase mb-6"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
            color: "#494949",
          }}
        >
          ADD NEW CAR
        </h1>

        <div className="mb-8">
          <div className="mb-3 text-sm font-medium uppercase" style={{ color: "#1F2937", fontFamily: "'Mulish', sans-serif" }}>
            Add New CAR FOR INSPECTION
          </div>
          <div className="mb-4 flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 flex-1"
                style={{
                  backgroundColor: i <= currentStep ? "#DC3729" : "#E5E7EB",
                  borderRadius: "0",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            {steps.map((step, i) => (
              <button
                key={step}
                type="button"
                onClick={() => {
                  if (i <= currentStep || validateStep(currentStep)) {
                    setCurrentStep(i);
                  }
                }}
                className="flex items-center gap-2 text-sm font-medium uppercase transition-colors"
                style={{ color: "#1F2937", fontFamily: "'Mulish', sans-serif" }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-autogemz-orange" />
                {step}
              </button>
            ))}
          </div>
        </div>

        {currentStep === 0 && (
        <>
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-1" style={{ backgroundColor: "#DC3729" }} />
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "28px",
                letterSpacing: "0.14em",
                color: "#111111",
              }}
            >
              BASIC INFORMATION
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SettingsInput
              label="Model"
              required
              placeholder="ENTER MODEL"
              name="model"
              value={formData.basicInformation.model}
              onChange={(e) => handleInputChange("basicInformation", "model", e.target.value)}
            />
            <SettingsInput
              label="City"
              required
              placeholder="ENTER CITY"
              name="city"
              value={formData.basicInformation.city}
              onChange={(e) => handleInputChange("basicInformation", "city", e.target.value)}
            />
          </div>
          <div
            className="border-2 border-dashed border-gray-300 flex flex-col items-center justify-center py-12 px-6 relative"
            style={{ borderRadius: "0" }}
          >
            <input 
              type="file" 
              multiple 
              className="hidden" 
              id="basic-info-images" 
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const urls = files.map(f => URL.createObjectURL(f));
                handleInputChange("basicInformation", "images", [...formData.basicInformation.images, ...urls]);
              }}
            />
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4"
            >
              <path
                d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19ZM12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                stroke="#DC3729"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              onClick={() => document.getElementById("basic-info-images")?.click()}
              className="px-6 py-2 text-sm font-semibold text-white uppercase mb-2"
              style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
            >
              ADD PHOTOS
            </button>
            <p className="text-sm" style={{ color: "#00000096" }}>
              Max limit 5 MB per image.
            </p>
            {formData.basicInformation.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.basicInformation.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="h-20 w-20 object-cover" />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-1" style={{ backgroundColor: "#DC3729" }} />
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "28px",
                letterSpacing: "0.14em",
                color: "#111111",
              }}
            >
              CAR SPECIFICATION
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsInput
              label="Inspection Date"
              required
              type="date"
              name="inspectionDate"
              value={formData.carSpecification.inspectionDate.split('T')[0]}
              onChange={(e) => handleInputChange("carSpecification", "inspectionDate", new Date(e.target.value).toISOString())}
            />
            <SettingsInput
              label="Engine Type"
              required
              placeholder="ENTER TYPE"
              name="engineType"
              value={formData.carSpecification.engineType}
              onChange={(e) => handleInputChange("carSpecification", "engineType", e.target.value)}
            />
            <SettingsInput
              label="Mileage"
              required
              type="number"
              placeholder="ENTER MILEAGE"
              name="mileage"
              value={formData.carSpecification.mileage}
              onChange={(e) => handleInputChange("carSpecification", "mileage", Number(e.target.value))}
            />
            <SettingsInput
              label="Engine No"
              required
              placeholder="ENTER ENGINE NO"
              name="engineNo"
              value={formData.carSpecification.engineNumber}
              onChange={(e) => handleInputChange("carSpecification", "engineNumber", e.target.value)}
            />
            <SettingsInput
              label="Registration No"
              required
              placeholder="ENTER"
              name="registrationNo"
              value={formData.carSpecification.registrationNumber}
              onChange={(e) => handleInputChange("carSpecification", "registrationNumber", e.target.value)}
            />
            <SettingsDropdown
              label="CNG Install"
              required
              placeholder="SELECT"
              options={yesNoOptions}
              name="cngInstall"
              value={formData.carSpecification.cngInstall ? "true" : "false"}
              onChange={(e) => handleInputChange("carSpecification", "cngInstall", e.target.value === "true")}
            />
            <SettingsInput
              label="Engine Capacity"
              required
              placeholder="ENTER CAPACITY"
              name="engineCapacity"
              value={formData.carSpecification.engineCapacity}
              onChange={(e) => handleInputChange("carSpecification", "engineCapacity", e.target.value)}
            />
            <SettingsInput
              label="Chassis No"
              required
              placeholder="ENTER CHASSIS NO"
              name="chassisNo"
              value={formData.carSpecification.chassisNumber}
              onChange={(e) => handleInputChange("carSpecification", "chassisNumber", e.target.value)}
            />
            <SettingsInput
              label="Transmission Type"
              required
              placeholder="ENTER TRANSMISSION"
              name="transmissionType"
              value={formData.carSpecification.transmissionType}
              onChange={(e) => handleInputChange("carSpecification", "transmissionType", e.target.value)}
            />
            <SettingsInput
              label="Registered City"
              required
              placeholder="ENTER CITY"
              name="registeredCity"
              value={formData.carSpecification.registeredCity}
              onChange={(e) => handleInputChange("carSpecification", "registeredCity", e.target.value)}
            />
            <SettingsInput
              label="Drive Type"
              required
              placeholder="ENTER DRIVE TYPE"
              name="driveType"
              value={formData.carSpecification.driveType}
              onChange={(e) => handleInputChange("carSpecification", "driveType", e.target.value)}
            />
            <SettingsInput
              label="Registered Year"
              required
              type="number"
              placeholder="ENTER YEAR"
              name="registeredYear"
              value={formData.carSpecification.registeredYear}
              onChange={(e) => handleInputChange("carSpecification", "registeredYear", Number(e.target.value))}
            />
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "28px",
                letterSpacing: "0.14em",
                color: "#111111",
              }}
            >
              EXTERIOR CONDITION
            </h2>
            <button
              onClick={() => setIsAddIssueOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-white uppercase shrink-0"
              style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
            >
              + ADD ISSUE
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              {formData.exteriorCondition.length > 0 ? (
                <div className="space-y-6">
                  {formData.exteriorCondition.map((condition, idx) => (
                    <div key={idx} className="border p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold uppercase">{condition.name} - {condition.markArea}</span>
                        <button 
                          onClick={() => {
                            const newConds = [...formData.exteriorCondition];
                            newConds.splice(idx, 1);
                            handleInputChange("exteriorCondition" as any, "", newConds);
                          }}
                          className="text-red-500 text-sm hover:underline"
                        >
                          REMOVE
                        </button>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{condition.selectIssue}</div>
                      <div className="flex flex-wrap gap-2">
                        {condition.images.map((img, i) => (
                          <img key={i} src={img} alt="" className="h-16 w-16 object-cover" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No exterior issues added yet.</p>
              )}
            </div>
            <div
              className="flex cursor-pointer flex-col"
              onClick={() => setIsMarkAreaOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setIsMarkAreaOpen(true)}
            >
              <ExteriorDesign />
            </div>
          </div>
        </section>
        </>
        )}

        {currentStep === 1 && (
          <AddNewCarDetailsContent formData={formData} onChange={handleInputChange} />
        )}

        {currentStep === 2 && (
          <section className="mb-10 text-center">
            <div
              className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-autogemz-orange"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2
              className="mb-4 uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "28px",
                letterSpacing: "0.14em",
                color: "#111111",
              }}
            >
              Ready to Submit
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Please review all steps before submitting your inspection report.
            </p>
          </section>
        )}

        <div className="border-t border-[#1F29371A] pt-6">
          {currentStep === 0 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-3 text-base font-semibold text-white uppercase"
              style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
            >
              SAVE & CONTINUE
            </button>
          )}
          {currentStep === 1 && (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="flex-1 py-3 text-base font-semibold uppercase"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #DC3729",
                  color: "#DC3729",
                  borderRadius: "0",
                }}
              >
                BACK
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-3 text-base font-semibold text-white uppercase"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                SAVE & CONTINUE
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="px-12 py-3 text-base font-semibold uppercase text-white disabled:opacity-50"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                {mutation.isPending ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </div>
          )}
        </div>
      </div>

      <AddIssueModal
        isOpen={isAddIssueOpen}
        onClose={() => setIsAddIssueOpen(false)}
        onAdd={handleAddIssue}
      />
      <MarkAreaModal
        isOpen={isMarkAreaOpen}
        onClose={() => setIsMarkAreaOpen(false)}
      />
      {isSubmitSuccessOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSubmitSuccessOpen(false)}
        >
          <div
            className="relative mx-4 w-full max-w-md rounded-lg bg-white p-8"
            style={{ boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSubmitSuccessOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex flex-col items-center pt-4">
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-autogemz-orange"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2
                className="mb-3 text-center uppercase"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#494949",
                }}
              >
                YOUR CAR HAS BEEN LISTED FOR INSPECTION
              </h2>
              <p
                className="mb-8 text-center text-sm"
                style={{ fontFamily: "'Mulish', sans-serif", color: "#ABABAB", lineHeight: "22px" }}
              >
                Great work! Your car inspection would be reviewed and live once approved by the admin.
              </p>
              <div className="flex w-full gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitSuccessOpen(false);
                    navigate("/inspector");
                  }}
                  className="flex-1 py-3 text-sm font-semibold uppercase text-white"
                  style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
                >
                  VIEW MY CAR
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitSuccessOpen(false)}
                  className="flex-1 py-3 text-sm font-semibold uppercase"
                  style={{
                    backgroundColor: "white",
                    border: "2px solid #DC3729",
                    color: "#DC3729",
                    borderRadius: "0",
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewCar;
