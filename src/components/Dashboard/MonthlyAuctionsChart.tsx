import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", completed: 545, created: 530 },
  { month: "Feb", completed: 568, created: 538 },
  { month: "Mar", completed: 573, created: 530 },
  { month: "Apr", completed: 520, created: 545 },
  { month: "May", completed: 550, created: 560 },
  { month: "Jun", completed: 590, created: 540 },
  { month: "Jul", completed: 580, created: 550 },
];

const MonthlyAuctionsChart = () => {
  return (
    <div
      className="bg-white p-6"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
      }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Monthly Auctions
      </h3>
      <div
        className="mb-4"
        style={{
          borderBottom: "1px solid #1F29371A",
        }}
      />
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3EB549" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3EB549" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#19ADD9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#19ADD9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#ABABAB", fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis
            domain={[510, 600]}
            tick={{ fill: "#ABABAB", fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "4px",
            }}
            labelStyle={{ color: "#1F2937" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="square"
            formatter={(value) => (
              <span style={{ color: "#1F2937", fontSize: "12px" }}>
                {value}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#3EB549"
            fillOpacity={1}
            fill="url(#colorCompleted)"
            name="Auctions Completed"
          />
          <Area
            type="monotone"
            dataKey="created"
            stroke="#19ADD9"
            fillOpacity={1}
            fill="url(#colorCreated)"
            name="Auctions Created"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyAuctionsChart;
