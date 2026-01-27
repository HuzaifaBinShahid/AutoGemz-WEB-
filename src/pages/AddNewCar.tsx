import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsInput from "../components/common/SettingsInput";
import SettingsDropdown from "../components/common/SettingsDropdown";
import ExteriorDesign from "../components/svgs/ExteriorDesign";
import AddIssueModal from "../components/common/AddIssueModal";
import MarkAreaModal from "../components/common/MarkAreaModal";
import AddNewCarDetailsContent from "../components/AddNewCar/DetailsStepAccordion";

const steps = ["Info", "Details", "Pictures", "Submit"];
const emptyOpts: { value: string; label: string }[] = [];

const COMMENT_PLACEHOLDER = "Describe Your car: Example: Alloy rim, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint etc.";

function SubmitStepTextArea({
  name,
  label,
  placeholder,
  maxLength = 1000,
}: {
  name: string;
  label: string;
  placeholder: string;
  maxLength?: number;
}) {
  const [value, setValue] = useState("");
  const remaining = maxLength - value.length;
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label
          className="text-base leading-6 text-[#111111]"
          style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 300 }}
        >
          {label}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "#1F293799" }}>
            Remaining Characters {remaining}
          </span>
          <button
            type="button"
            onClick={() => setValue("")}
            className="text-sm font-medium"
            style={{ color: "#DC3729" }}
          >
            Reset
          </button>
        </div>
      </div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={6}
        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-autogemz-orange"
        style={{
          backgroundColor: "#0000000D",
          backdropFilter: "blur(5px)",
          border: "none",
          fontFamily: "'Mulish', sans-serif",
          color: "#00000096",
          resize: "vertical",
        }}
      />
      <style>{`textarea[name="${name}"]::placeholder { color: #00000096 !important; }`}</style>
    </div>
  );
}

const AddNewCar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAddIssueOpen, setIsAddIssueOpen] = useState(false);
  const [isMarkAreaOpen, setIsMarkAreaOpen] = useState(false);
  const [isSubmitSuccessOpen, setIsSubmitSuccessOpen] = useState(false);
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
            {[0, 1, 2, 3].map((i) => (
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
                onClick={() => setCurrentStep(i)}
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
          <h2
            className="uppercase mb-4"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SettingsDropdown
              label="Model"
              required
              placeholder="SELECT MODEL"
              options={emptyOpts}
              name="model"
            />
            <SettingsDropdown
              label="City"
              required
              placeholder="SELECT CITY"
              options={emptyOpts}
              name="city"
            />
          </div>
          <div
            className="border-2 border-dashed border-gray-300 flex flex-col items-center justify-center py-12 px-6"
            style={{ borderRadius: "0" }}
          >
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
              className="px-6 py-2 text-sm font-semibold text-white uppercase mb-2"
              style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
            >
              ADD PHOTOS
            </button>
            <p className="text-sm" style={{ color: "#00000096" }}>
              Max limit 5 MB per image.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2
            className="uppercase mb-4"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsDropdown
              label="Inspection Date"
              required
              placeholder="SELECT DATE"
              options={emptyOpts}
              name="inspectionDate"
            />
            <SettingsDropdown
              label="Engine Type"
              required
              placeholder="SELECT TYPE"
              options={emptyOpts}
              name="engineType"
            />
            <SettingsDropdown
              label="Mileage"
              required
              placeholder="SELECT"
              options={emptyOpts}
              name="mileage"
            />
            <SettingsDropdown
              label="Engine No"
              required
              placeholder="SELECT"
              options={emptyOpts}
              name="engineNo"
            />
            <SettingsInput
              label="Registration No"
              required
              placeholder="ENTER"
              name="registrationNo"
            />
            <SettingsDropdown
              label="CNG Install"
              required
              placeholder="SELECT"
              options={emptyOpts}
              name="cngInstall"
            />
            <SettingsDropdown
              label="Engine Capacity"
              required
              placeholder="SELECT DATE"
              options={emptyOpts}
              name="engineCapacity"
            />
            <SettingsInput
              label="Chassis No"
              required
              placeholder="ENTER"
              name="chassisNo"
            />
            <SettingsDropdown
              label="Transmission Type"
              required
              placeholder="SELECT DATE"
              options={emptyOpts}
              name="transmissionType"
            />
            <SettingsDropdown
              label="Registered City"
              required
              placeholder="SELECT CITY"
              options={emptyOpts}
              name="registeredCity"
            />
            <SettingsDropdown
              label="Drive Type"
              required
              placeholder="SELECT TYPE"
              options={emptyOpts}
              name="driveType"
            />
            <SettingsDropdown
              label="Registered Year"
              required
              placeholder="SELECT YEAR"
              options={emptyOpts}
              name="registeredYear"
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
              ADD NEW
            </button>
          </div>
          <div className="flex items-center gap-2 mb-6" style={{ color: "#DC3729" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm" style={{ fontFamily: "'Mulish', sans-serif", color: "#111111" }}>
              Select or add a point to the car layout to add images of issues in the car.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"
                  alt="Car roof"
                  className="w-full h-auto object-cover"
                  style={{ borderRadius: "0" }}
                />
                <button
                  className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white uppercase"
                  style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
                >
                  EDIT
                </button>
              </div>
              <p className="mt-2 text-base font-medium text-black uppercase">
                02 CAR ROOF
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>P</span>
                  <span className="text-sm font-medium text-black uppercase">PAINT MARKED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>D</span>
                  <span className="text-sm font-medium text-black uppercase">DENT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>B2</span>
                  <span className="text-sm font-medium text-black uppercase">BIG SCRATCH</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>D1</span>
                  <span className="text-sm font-medium text-black uppercase">SMALL DENT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>S1</span>
                  <span className="text-sm font-medium text-black uppercase">SMALL SCRATCH</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>D2</span>
                  <span className="text-sm font-medium text-black uppercase">DENT WITH SCRATCH (SIZE LIKE FLAT OF THE HAND)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>S</span>
                  <span className="text-sm font-medium text-black uppercase">SCRATCH</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-white shrink-0" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>D3</span>
                  <span className="text-sm font-medium text-black uppercase">SMALL DENT WITH SCRATCH (SIZE LIKE A THUMB)</span>
                </div>
              </div>
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
          <AddNewCarDetailsContent />
        )}

        {currentStep === 2 && (
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-1 shrink-0" style={{ backgroundColor: "#DC3729" }} />
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
                ADD MORE PICTURES
              </h2>
            </div>
            <div
              className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 py-16"
              style={{ borderRadius: "0" }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-8 top-8 opacity-60"
                style={{ color: "#DC3729" }}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
                <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <button
                type="button"
                className="mb-2 px-6 py-2 text-sm font-semibold uppercase text-white"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                + ADD PHOTOS
              </button>
              <p className="text-sm" style={{ color: "#1F293799" }}>
                (Max limit 5 MB per image)
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="10" cy="10" r="9" fill="#3EB549" />
                  <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm" style={{ fontFamily: "'Mulish', sans-serif", color: "#111111" }}>
                  Adding at least 8 pictures improves the chances for a quick sale.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="10" cy="10" r="9" fill="#3EB549" />
                  <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm" style={{ fontFamily: "'Mulish', sans-serif", color: "#111111" }}>
                  Photos should be in &apos;jpeg, jpg, png, gif&apos; format only.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="10" cy="10" r="9" fill="#3EB549" />
                  <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm" style={{ fontFamily: "'Mulish', sans-serif", color: "#111111" }}>
                  Adding clear Front, Back and Interior pictures of your car increases the quality of your Ad and gets you noticed more.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="10" cy="10" r="9" fill="#3EB549" />
                  <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm" style={{ fontFamily: "'Mulish', sans-serif", color: "#111111" }}>
                  Pictures should be 800x600 centre frame image.
                </span>
              </li>
            </ul>
          </section>
        )}

        {currentStep === 3 && (
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-1 shrink-0" style={{ backgroundColor: "#DC3729" }} />
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
                COMMENTS
              </h2>
            </div>
            <SubmitStepTextArea
              name="comments"
              label="Comments"
              placeholder={COMMENT_PLACEHOLDER}
              maxLength={1000}
            />
            <div className="mb-6 mt-10 flex items-center gap-3">
              <div className="h-12 w-1 shrink-0" style={{ backgroundColor: "#DC3729" }} />
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
                DISCLAIMER
              </h2>
            </div>
            <SubmitStepTextArea
              name="disclaimer"
              label="Disclaimer"
              placeholder={COMMENT_PLACEHOLDER}
              maxLength={1000}
            />
          </section>
        )}

        <div className="border-t border-[#1F29371A] pt-6">
          {currentStep === 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
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
                onClick={() => setCurrentStep(2)}
                className="flex-1 py-3 text-base font-semibold text-white uppercase"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                SAVE & CONTINUE
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-3 text-base font-semibold uppercase"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #D1D5DB",
                  color: "#374151",
                  borderRadius: "0",
                }}
              >
                BACK
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex-1 py-3 text-base font-semibold text-white uppercase"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                SAVE & CONTINUE
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsSubmitSuccessOpen(true)}
                className="px-12 py-3 text-base font-semibold uppercase text-white"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>

      <AddIssueModal
        isOpen={isAddIssueOpen}
        onClose={() => setIsAddIssueOpen(false)}
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
