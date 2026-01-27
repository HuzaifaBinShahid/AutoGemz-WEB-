import { useState, useRef } from "react";
import SettingsInput from "../common/SettingsInput";
import SettingsDropdown from "../common/SettingsDropdown";

const emptyOpts: { value: string; label: string }[] = [];

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
  extraInput?: { label: string; name: string; placeholder: string };
}

const FieldWithImageRow = ({ label, name, extraInput }: FieldWithImageRowProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
    if (fileRef.current) fileRef.current.value = "";
  };
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1 basis-40">
          <SettingsDropdown label={label} required placeholder="SELECT" options={emptyOpts} name={name} />
        </div>
        {preview && (
          <img
            src={preview}
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
      {extraInput && (
        <div className="mt-2">
          <SettingsInput label={extraInput.label} placeholder={extraInput.placeholder} name={extraInput.name} />
        </div>
      )}
    </div>
  );
};

const AddNewCarDetailsContent = () => {
  return (
    <>
      <DetailsSection title="BODY FRAME ACCIDENT" />
      <DetailsSection title="ENGINE/TRANSMISSION" />
      <DetailsSection title="SUSPENSION/STEERING" />
      <DetailsSection title="INTERIOR" />
      <DetailsSection title="AC / HEATER" expandedDefault>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsDropdown label="AC Fitted" required placeholder="SELECT" options={emptyOpts} name="acFitted" />
          <SettingsDropdown label="Heating" required placeholder="SELECT" options={emptyOpts} name="heating" />
          <SettingsDropdown label="Cooling" required placeholder="SELECT" options={emptyOpts} name="cooling" />
          <SettingsDropdown label="Blower" required placeholder="SELECT" options={emptyOpts} name="blower" />
          <div className="md:col-span-2">
            <SettingsDropdown label="AC Operational" required placeholder="SELECT" options={emptyOpts} name="acOperational" />
          </div>
        </div>
      </DetailsSection>
      <DetailsSection title="BREAKS" expandedDefault>
        <FieldWithImageRow label="Front Right Disc" name="frontRightDisc" extraInput={{ label: "LININGS", name: "frontRightDiscLinings", placeholder: "ENTER" }} />
        <FieldWithImageRow label="Front Left Disc" name="frontLeftDisc" />
        <FieldWithImageRow label="Front Right Brake Pad" name="frontRightBrakePad" />
        <FieldWithImageRow label="Front Left Brake Pad" name="frontLeftBrakePad" />
      </DetailsSection>
      <DetailsSection title="ELECTRICAL & ELECTRONICS" expandedDefault>
        <h4
          className="mb-4 uppercase"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            letterSpacing: "0.14em",
            color: "#111111",
          }}
        >
          Computer Check up
        </h4>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldWithImageRow label="Computer Check up / Malfunction Check" name="computerCheckup" />
          <FieldWithImageRow label="Rear View Camera" name="rearViewCamera" />
          <FieldWithImageRow label="Battery Warning Light" name="batteryWarningLight" />
          <FieldWithImageRow label="Oil Pressure Low Warning Light" name="oilPressureLight" />
          <FieldWithImageRow label="Temperature Warning Light / Gauges" name="temperatureGauges" />
          <FieldWithImageRow label="Gauges" name="gauges" />
          <FieldWithImageRow label="Airbag Warning Light" name="airbagLight" />
          <FieldWithImageRow label="Power Steering Warning Light" name="powerSteeringLight" />
          <FieldWithImageRow label="ABS Warning Light" name="absLight" />
          <FieldWithImageRow label="Key Fob Battery Low Light" name="keyFobBatteryLight" />
        </div>
        <h4
          className="mb-4 uppercase"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            letterSpacing: "0.14em",
            color: "#111111",
          }}
        >
          Battery
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldWithImageRow label="Voltage" name="voltage" />
          <FieldWithImageRow label="Terminal Condition" name="terminalCondition" />
          <FieldWithImageRow label="Charging" name="charging" />
          <FieldWithImageRow label="Alternator Operation" name="alternatorOperation" />
        </div>
      </DetailsSection>
      <DetailsSection title="EXTERIOR/BODY" />
      <DetailsSection title="TYRES" />
      <DetailsSection title="TEST DRIVE" />
    </>
  );
};

export default AddNewCarDetailsContent;
