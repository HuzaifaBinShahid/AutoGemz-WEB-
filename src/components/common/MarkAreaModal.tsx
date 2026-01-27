import { useState } from "react";
import ExteriorDesign from "../svgs/ExteriorDesign";

interface MarkAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (points: { x: number; y: number }[]) => void;
}

const MarkAreaModal = ({ isOpen, onClose, onSave }: MarkAreaModalProps) => {
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDiagramClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDots((prev) => [...prev, { x, y }]);
  };

  const handleSave = () => {
    onSave?.(dots);
    setDots([]);
    onClose();
  };

  const handleClearMark = () => {
    setDots([]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative mx-4 w-full max-w-3xl bg-white p-6"
        style={{
          boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
          borderRadius: "0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
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
          MARK AREA
        </h2>

        <div
          className="relative cursor-crosshair overflow-hidden flex justify-center items-center"
          style={{ minHeight: "280px" }}
          onClick={handleDiagramClick}
        >
          <ExteriorDesign />
          {dots.map((d, i) => (
            <div
              key={i}
              className="pointer-events-none absolute h-3 w-3 rounded-full"
              style={{
                left: d.x - 6,
                top: d.y - 6,
                backgroundColor: "#DC3729",
              }}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 text-sm font-semibold uppercase text-white"
            style={{ backgroundColor: "#DC3729", borderRadius: "0" }}
          >
            SAVE
          </button>
          <button
            type="button"
            onClick={handleClearMark}
            className="flex-1 py-3 text-sm font-semibold uppercase"
            style={{
              color: "#DC3729",
              border: "2px solid #DC3729",
              backgroundColor: "white",
              borderRadius: "0",
            }}
          >
            CLEAR MARK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAreaModal;
