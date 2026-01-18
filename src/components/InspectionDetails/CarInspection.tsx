interface InspectionItem {
  name: string;
  percentage: number;
}

interface CarInspectionProps {
  items: InspectionItem[];
}

const CarInspection = ({ items }: CarInspectionProps) => {
  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-autogemz-orange"></div>
        <h3 className="uppercase font-semibold text-lg leading-6 text-black" style={{ fontFamily: "Chakra Petch, sans-serif" }}>
          CAR INSPECTION
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-black">{item.name}</span>
              <span className="text-base font-medium text-black">{item.percentage}%</span>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-1 transition-all duration-300"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: "#DC3729",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarInspection;
