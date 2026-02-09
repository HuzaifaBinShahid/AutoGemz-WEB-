import { useRef, useState } from "react";
import SettingsInput from "./SettingsInput";
import SettingsDropdown from "./SettingsDropdown";

interface AddIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: { name: string; markArea: string; issue: string; images: File[] }) => void;
}

const MB = 5 * 1024 * 1024;
const exteriorIssueOptions = [
  { value: "PAINT MARKED", label: "PAINT MARKED" },
  { value: "DENT", label: "DENT" },
  { value: "BIG SCRATCH", label: "BIG SCRATCH" },
  { value: "SMALL DENT", label: "SMALL DENT" },
  { value: "SMALL SCRATCH", label: "SMALL SCRATCH" },
  { value: "DENT WITH SCRATCH", label: "DENT WITH SCRATCH (SIZE LIKE FLAT OF THE HAND)" },
  { value: "SCRATCH", label: "SCRATCH" },
  { value: "SMALL DENT WITH SCRATCH", label: "SMALL DENT WITH SCRATCH (SIZE LIKE A THUMB)" },
];

const AddIssueModal = ({ isOpen, onClose, onAdd }: AddIssueModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [markArea, setMarkArea] = useState("");
  const [issue, setIssue] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files ? Array.from(e.target.files) : [];
    const valid = chosen.filter((f) => f.size <= MB);
    const urls = valid.map((f) => URL.createObjectURL(f));
    setFiles((prev) => [...prev, ...valid]);
    setPreviews((prev) => [...prev, ...urls]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePreview = (idx: number) => {
    URL.revokeObjectURL(previews[idx]);
    setPreviews((p) => p.filter((_, i) => i !== idx));
    setFiles((f) => f.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    onAdd?.({ name, markArea, issue, images: files });
    setName("");
    setMarkArea("");
    setIssue("");
    setFiles([]);
    previews.forEach(URL.revokeObjectURL);
    setPreviews([]);
    onClose();
  };

  const handleCancel = () => {
    setName("");
    setMarkArea("");
    setIssue("");
    setFiles([]);
    previews.forEach(URL.revokeObjectURL);
    setPreviews([]);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative mx-4 w-full max-w-lg bg-white p-6"
        style={{
          boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
          borderRadius: "0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center bg-gray-200 transition-colors hover:bg-gray-300"
          style={{ borderRadius: "0" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M13 1L1 13" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h2
          className="mb-6 uppercase"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
            color: "#111111",
          }}
        >
          ADD ISSUE
        </h2>

        <div
          className="mb-6 border-2 border-dashed border-gray-300 py-8"
          style={{ borderRadius: "0" }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {previews.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#DC3729" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="#DC3729" strokeWidth="2" />
                <path d="M21 15L16 10L5 21" stroke="#DC3729" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mb-2 px-6 py-2 text-sm font-semibold uppercase text-white"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                + ADD PHOTOS
              </button>
              <p className="text-sm" style={{ color: "#00000096" }}>
                (Max limit 5 MB per image)
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center px-4">
              <div className="mb-3 flex flex-wrap justify-center gap-2">
                {previews.map((url, i) => (
                  <div key={i} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      className="h-20 w-20 object-cover"
                      style={{ borderRadius: "0" }}
                    />
                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-gray-700 text-white"
                      style={{ borderRadius: "0" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-semibold uppercase text-white"
                style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
              >
                + ADD MORE
              </button>
              <p className="mt-1 text-xs" style={{ color: "#00000096" }}>
                (Max limit 5 MB per image)
              </p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <SettingsInput
            label="Name"
            required
            placeholder="ENTER"
            name="addIssueName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-base leading-6 text-[#111111]"
            style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 300 }}
          >
            Mark Area <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <input
              value={markArea}
              onChange={(e) => setMarkArea(e.target.value)}
              placeholder="MARK AREA"
              name="markArea"
              className="flex-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-autogemz-orange"
              style={{
                backgroundColor: "#0000000D",
                backdropFilter: "blur(5px)",
                border: "none",
                fontFamily: "'Mulish', sans-serif",
                color: "#00000096",
              }}
            />
            <button
              type="button"
              className="flex h-[52px] w-12 shrink-0 items-center justify-center border border-[#0000004D] bg-[#0000000D]"
              style={{ borderRadius: "0" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <style>{`input[name="markArea"]::placeholder { color: #00000096 !important; }`}</style>
        </div>

        <div className="mb-6">
          <SettingsDropdown
            label="Select Issue"
            required
            placeholder="SELECT ISSUE"
            options={exteriorIssueOptions}
            name="selectIssue"
            value={issue}
            onChange={(e: any) => setIssue(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 text-sm font-semibold uppercase text-white"
            style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
          >
            ADD
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 text-sm font-semibold uppercase"
            style={{
              color: "#DC3729",
              border: "2px solid #DC3729",
              backgroundColor: "white",
              borderRadius: "0",
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIssueModal;
