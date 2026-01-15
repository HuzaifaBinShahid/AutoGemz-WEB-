const PlatformActivityTable = () => {
  const data = [
    { metric: "Total Inspections", count: "1,245", trend: "+12%" },
    { metric: "Instant Offers Created", count: "3,410", trend: "+08%" },
    { metric: "Cars Approved for Auction", count: "920", trend: "+12%" },
    { metric: "Auctions Completed", count: "740", trend: "+05%" },
    { metric: "Refunds Processed", count: "120", trend: "+16%" },
  ];

  return (
    <div
      className="bg-white p-6"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
      }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: "#1F2937" }}>
        Platform Activity Overview
      </h3>
      <div className="mb-4" />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              style={{
                borderTop: "1px solid #F2F2F2",
                borderBottom: "1px solid #F2F2F2",
              }}
            >
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: "#1F293799" }}
              >
                METRIC
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: "#1F293799" }}
              >
                COUNT
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: "#1F293799" }}
              >
                TREND
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                style={{
                  borderBottom:
                    index < data.length - 1 ? "1px solid #F2F2F2" : "none",
                }}
              >
                <td className="py-3 px-4 text-gray-700">{row.metric}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">
                  {row.count}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4L12 8H9V12H7V8H4L8 4Z" fill="#10B981" />
                    </svg>
                    <span className="text-green-600 font-medium">
                      {row.trend}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformActivityTable;
