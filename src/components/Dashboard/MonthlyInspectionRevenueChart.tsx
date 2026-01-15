import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', total: 583, earnings: 568 },
  { month: 'Feb', total: 583, earnings: 583 },
  { month: 'Mar', total: 562, earnings: 588 },
  { month: 'Apr', total: 593, earnings: 555 },
  { month: 'May', total: 588, earnings: 583 },
  { month: 'Jun', total: 593, earnings: 588 },
  { month: 'Jul', total: 562, earnings: 578 },
];

const MonthlyInspectionRevenueChart = () => {
  return (
    <div
      className="bg-white p-6"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A',
      }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Inspection Revenue</h3>
      <div
        className="mb-4"
        style={{
          borderBottom: '1px solid #1F29371A',
        }}
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#ABABAB', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            domain={[510, 600]}
            tick={{ fill: '#ABABAB', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#1F2937' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
            formatter={(value) => (
              <span style={{ color: '#1F2937', fontSize: '12px' }}>{value}</span>
            )}
          />
          <Bar dataKey="total" fill="#3EB549" name="Total per month" radius={[4, 4, 0, 0]} />
          <Bar dataKey="earnings" fill="#DC3729" name="Platform earnings (fees)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyInspectionRevenueChart;
