import { useState, useRef } from "react";
import SettingsInput from "../common/SettingsInput";
import SettingsDropdown from "../common/SettingsDropdown";
import type { CreateInspectionPayload } from "../../services/inspectionService";

const yesNoOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

interface DetailsSectionProps {
  title: string;
  expandedDefault?: boolean;
  children: React.ReactNode;
}

const DetailsSection = ({ title, expandedDefault = false, children }: DetailsSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(expandedDefault);
  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: "#F2F2F2",
        borderRadius: "0",
      }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-1 shrink-0" style={{ backgroundColor: "#DC3729" }} />
          <h3
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
            {title}
          </h3>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          style={{ color: "#111111" }}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isExpanded && <div className="border-t border-[#1F29371A] px-4 pb-6 pt-4">{children}</div>}
    </div>
  );
};

interface FieldWithImageRowProps {
  label: string;
  name: string;
  value?: string;
  image?: string;
  onValueChange?: (val: string) => void;
  onImageChange?: (img: string) => void;
}

const FieldWithImageRow = ({ label, name, value, image, onValueChange, onImageChange }: FieldWithImageRowProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const imageUrl = URL.createObjectURL(f);
      onImageChange?.(imageUrl);
    }
    if (fileRef.current) fileRef.current.value = "";
  };
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1 basis-40">
          <SettingsInput 
            label={label} 
            required 
            placeholder="ENTER" 
            name={name} 
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
          />
        </div>
        {image && (
          <img
            src={image}
            alt=""
            className="h-14 w-20 shrink-0 object-cover"
            style={{ borderRadius: "0" }}
          />
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="shrink-0 px-5 py-4 text-xs font-semibold uppercase text-white"
          style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
        >
          ADD IMAGE
        </button>
      </div>
    </div>
  );
};

interface AddNewCarDetailsContentProps {
  formData: CreateInspectionPayload;
  onChange: (section: keyof CreateInspectionPayload, field: string, value: any) => void;
}

const AddNewCarDetailsContent = ({ formData, onChange }: AddNewCarDetailsContentProps) => {
  const handleAcChange = (field: string, value: any) => {
    onChange("acHeater", field, value);
  };

  const handleBrakeChange = (field: string, value: any) => {
    onChange("brake", field, value);
  };

  const handleElectricalChange = (field: string, value: any) => {
    onChange("electricalElectronics", field, value);
  };

  return (
    <>
      <DetailsSection title="AC / HEATER" expandedDefault>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsDropdown 
            label="AC Fitted" 
            required 
            placeholder="SELECT" 
            options={yesNoOptions} 
            name="acFitted" 
            value={formData.acHeater.acFitted ? "true" : "false"}
            onChange={(e) => handleAcChange("acFitted", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Heating" 
            required 
            placeholder="SELECT" 
            options={yesNoOptions} 
            name="heating" 
            value={formData.acHeater.heating ? "true" : "false"}
            onChange={(e) => handleAcChange("heating", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Cooling" 
            required 
            placeholder="SELECT" 
            options={yesNoOptions} 
            name="cooling" 
            value={formData.acHeater.cooling ? "true" : "false"}
            onChange={(e) => handleAcChange("cooling", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Blower" 
            required 
            placeholder="SELECT" 
            options={yesNoOptions} 
            name="blower" 
            value={formData.acHeater.blower ? "true" : "false"}
            onChange={(e) => handleAcChange("blower", e.target.value === "true")}
          />
          <div className="md:col-span-2">
            <SettingsInput 
              label="AC Operational" 
              required 
              placeholder="ENTER STATUS" 
              name="acOperational" 
              value={formData.acHeater.acOptional}
              onChange={(e) => handleAcChange("acOptional", e.target.value)}
            />
          </div>
        </div>
      </DetailsSection>
      <DetailsSection title="BRAKES" expandedDefault>
        <FieldWithImageRow 
          label="Front Right Disc" 
          name="frontRightDisc" 
          value={formData.brake.frontRightDisc}
          image={formData.brake.frontRightDiscImage}
          onValueChange={(val) => handleBrakeChange("frontRightDisc", val)}
          onImageChange={(img) => handleBrakeChange("frontRightDiscImage", img)}
        />
        <FieldWithImageRow 
          label="Front Left Disc" 
          name="frontLeftDisc" 
          value={formData.brake.frontLeftDisc}
          image={formData.brake.frontLeftDiscImage}
          onValueChange={(val) => handleBrakeChange("frontLeftDisc", val)}
          onImageChange={(img) => handleBrakeChange("frontLeftDiscImage", img)}
        />
        <FieldWithImageRow 
          label="Front Right Brake Pad" 
          name="frontRightBrakePad" 
          value={formData.brake.frontRightBrakePad}
          image={formData.brake.frontRightBrakePadImage}
          onValueChange={(val) => handleBrakeChange("frontRightBrakePad", val)}
          onImageChange={(img) => handleBrakeChange("frontRightBrakePadImage", img)}
        />
        <FieldWithImageRow 
          label="Front Left Brake Pad" 
          name="frontLeftBrakePad" 
          value={formData.brake.frontLeftBrakePad}
          image={formData.brake.frontLeftBrakePadImage}
          onValueChange={(val) => handleBrakeChange("frontLeftBrakePad", val)}
          onImageChange={(img) => handleBrakeChange("frontLeftBrakePadImage", img)}
        />
      </DetailsSection>
      <DetailsSection title="ELECTRICAL & ELECTRONICS" expandedDefault>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsDropdown 
            label="Computer Check up / Malfunction Check" 
            name="computerCheckup" 
            options={yesNoOptions}
            value={formData.electricalElectronics.computerCheckup ? "true" : "false"}
            onChange={(e) => handleElectricalChange("computerCheckup", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Rear View Camera" 
            name="rearViewCamera" 
            options={yesNoOptions}
            value={formData.electricalElectronics.rearViewCamera ? "true" : "false"}
            onChange={(e) => handleElectricalChange("rearViewCamera", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Battery Warning Light" 
            name="batteryWarningLight" 
            options={yesNoOptions}
            value={formData.electricalElectronics.batteringWarningLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("batteringWarningLight", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Oil Pressure Low Warning Light" 
            name="oilPressureLight" 
            options={yesNoOptions}
            value={formData.electricalElectronics.oilPressureLowWarningLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("oilPressureLowWarningLight", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Temperature Warning Light / Gauges" 
            name="temperatureGauges" 
            options={yesNoOptions}
            value={formData.electricalElectronics.temperatureWarningLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("temperatureWarningLight", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Gauges" 
            name="gauges" 
            options={yesNoOptions}
            value={formData.electricalElectronics.gauges ? "true" : "false"}
            onChange={(e) => handleElectricalChange("gauges", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Airbag Warning Light" 
            name="airbagLight" 
            options={yesNoOptions}
            value={formData.electricalElectronics.airBagWarningLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("airBagWarningLight", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Power Steering Warning Light" 
            name="powerSteeringLight" 
            options={yesNoOptions}
            value={formData.electricalElectronics.powerSteeringWarningLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("powerSteeringWarningLight", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="ABS Warning Light" 
            name="absLight" 
            options={yesNoOptions}
            value={formData.electricalElectronics.absWarningLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("absWarningLight", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Key Fob Battery Low Light" 
            name="keyFobBatteryLight" 
            options={yesNoOptions}
            value={formData.electricalElectronics.keyFobBatteryLowLight ? "true" : "false"}
            onChange={(e) => handleElectricalChange("keyFobBatteryLowLight", e.target.value === "true")}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsInput 
            label="Voltage" 
            name="voltage" 
            placeholder="ENTER VOLTAGE"
            value={formData.electricalElectronics.voltage}
            onChange={(e) => handleElectricalChange("voltage", e.target.value)}
          />
          <SettingsInput 
            label="Terminal Condition" 
            name="terminalCondition" 
            placeholder="ENTER CONDITION"
            value={formData.electricalElectronics.terminalCondition}
            onChange={(e) => handleElectricalChange("terminalCondition", e.target.value)}
          />
          <SettingsDropdown 
            label="Charging" 
            name="charging" 
            options={yesNoOptions}
            value={formData.electricalElectronics.charging ? "true" : "false"}
            onChange={(e) => handleElectricalChange("charging", e.target.value === "true")}
          />
          <SettingsDropdown 
            label="Alternator Operation" 
            name="alternatorOperation" 
            options={yesNoOptions}
            value={formData.electricalElectronics.alternatorOperation ? "true" : "false"}
            onChange={(e) => handleElectricalChange("alternatorOperation", e.target.value === "true")}
          />
        </div>
      </DetailsSection>
    </>
  );
};

export default AddNewCarDetailsContent;
