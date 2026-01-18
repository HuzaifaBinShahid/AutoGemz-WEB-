import ExteriorDesign from "../svgs/ExteriorDesign";

interface ExteriorConditionProps {
  image: string;
  tag: string;
  label: string;
}

const ExteriorCondition = ({ image, tag, label }: ExteriorConditionProps) => {
  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <div className="flex  items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-autogemz-orange"></div>
        <h3
          className="uppercase font-medium text-black"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
            verticalAlign: "middle",
          }}
        >
          EXTERIOR CONDITION
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
        <div className="flex flex-col">
          <img
            src={image}
            alt={label}
            className="w-full h-auto object-cover"
            style={{ borderRadius: "0" }}
          />
          <div
            className="w-full flex items-center gap-3 px-4 py-3"
            style={{
              background: "linear-gradient(221.12deg, rgba(220, 55, 41, 0.75) 3%, rgba(0, 0, 0, 0.08) 27%, rgba(0, 0, 0, 0.08) 74%, rgba(203, 61, 29, 0.55) 90.59%, rgba(220, 55, 41, 0.5) 100%)",
              borderRadius: "0",
            }}
          >
            <span className="px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>
              {tag}
            </span>
            <span className="text-base font-medium text-black">{label}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>
                W2
              </span>
              <span className="text-base font-medium text-black uppercase">POLYCATE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>
                D1
              </span>
              <span className="text-base font-medium text-black uppercase">SMALL DENT</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>
                P
              </span>
              <span className="text-base font-medium text-black uppercase">PAINT MARKED</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: "#DC3729", borderRadius: "0" }}>
                D2
              </span>
              <span className="text-base font-medium text-black uppercase">DENT</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <ExteriorDesign />

        </div>
      </div>
    </div>
  );
};

export default ExteriorCondition;
