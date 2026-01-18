import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface OverallRatingProps {
  rating: number;
  maxRating: number;
}

const OverallRating = ({ rating, maxRating }: OverallRatingProps) => {
  const ratingPercentage = (rating / maxRating) * 100;
  
  let ratingColor = "#DC3729";
  let ratingLabel = "BELOW AVERAGE";
  
  if (ratingPercentage >= 75) {
    ratingColor = "#3EB549";
    ratingLabel = "EXCELLENT";
  } else if (ratingPercentage >= 50) {
    ratingColor = "#2DD4BF";
    ratingLabel = "BETTER";
  } else if (ratingPercentage >= 25) {
    ratingColor = "#19ADD9";
    ratingLabel = "AVERAGE";
  }

  const data = [
    { name: "Rating", value: rating },
    { name: "Remaining", value: maxRating - rating },
  ];

  const COLORS = [ratingColor, "#E5E7EB"];

  return (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 " style={{ backgroundColor: "#3EB549" }}></div>
          <span className="text-md text-black font-semibold">EXCELLENT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 " style={{ backgroundColor: "#2DD4BF" }}></div>
          <span className="text-md text-black font-semibold">BETTER</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 " style={{ backgroundColor: "#19ADD9" }}></div>
          <span className="text-md text-black font-semibold">AVERAGE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 " style={{ backgroundColor: "#DC3729" }}></div>
          <span className="text-md text-black font-semibold">BELOW AVERAGE</span>
        </div>
      </div>

      <div className="relative" style={{ width: "200px", height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: "#D2532D" }}>
            {rating.toFixed(2)}
          </span>
          <span className="text-md text-gray-500">/ {maxRating}</span>
        </div>
      </div>
    </div>
  );
};

export default OverallRating;
