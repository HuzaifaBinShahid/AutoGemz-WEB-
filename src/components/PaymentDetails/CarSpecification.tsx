interface CarSpecificationProps {
  make: string;
  model: string;
  mileage: string;
  year: number;
  mileageKm: string;
  transmission: string;
  registration: string;
  transactionId: string;
  description?: string;
}

const CarSpecification = ({
  make,
  model,
  mileage,
  year,
  mileageKm,
  transmission,
  registration,
  transactionId,
  description,
}: CarSpecificationProps) => {
  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-autogemz-orange"></div>
        <h3
          className="uppercase font-bold text-base leading-6 text-black"
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0.14em",
            verticalAlign: "middle",
          }}
        >
          CAR SPECIFICATION
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Make:</span>
          <span className="font-semibold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {make}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Model:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {model}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Mileage:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {mileage}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Year:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {year}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Mileage:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {mileageKm}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Transmission:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {transmission}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Registration:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {registration}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Transaction ID:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {transactionId}
          </span>
        </div>
      </div>
      {description && (
        <div className="mt-4">
          <span className="text-black font-semibold text-[18px] mb-2 block">Description:</span>
          <p className="font-semibold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CarSpecification;
