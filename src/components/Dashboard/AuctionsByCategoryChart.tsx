import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "SEDAN", value: 35, color: "#3EB549" },
  { name: "SUV", value: 25, color: "#2DD4BF" },
  { name: "HYBRID", value: 20, color: "#19ADD9" },
  { name: "IMPORTED", value: 15, color: "#F59E0B" },
  { name: "OTHERS", value: 5, color: "#DC3729" },
];

const AuctionsByCategoryChart = () => {
  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Auctions by Category
      </h3>
      <div className="mb-4 border-b border-[#1F29371A]" />
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium text-gray-900"
            >
              Categories
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex  justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionsByCategoryChart;
