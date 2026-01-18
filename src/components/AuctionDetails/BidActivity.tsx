interface Bid {
  id: number;
  rank: number;
  bidder: {
    image: string;
    name: string;
    isYou?: boolean;
  };
  bid: string;
  placed: string;
}

interface BidActivityProps {
  bids: Bid[];
  timeRemaining: string;
}

const BidActivity = ({ bids, timeRemaining }: BidActivityProps) => {
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
          BID ACTIVITY
        </h3>
      </div>

      <div className="mb-4 border-b border-[#1F29371A]" />

      <div className="overflow-x-auto">
        <table className="w-full" >
          <thead>
            <tr>
              <th
                className="text-left py-3 px-4 font-medium text-black "
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif"}}
              >
                <span className="border-l-4 border-autogemz-orange pr-4"></span>
                RANK
              </th>
              <th
                className="text-left py-3 px-4 font-medium text-black "
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                 <span className="border-l-4 border-autogemz-orange pr-4"></span>
                BID
              </th>
              <th
                className="text-left py-3 px-4 font-medium text-black bg-[#0000000D]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
               
                {timeRemaining}
              </th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr
                key={bid.id}
                className={`text-black ${
                  bid.rank === 61 ? "bg-[#DC3729BF]" : "bg-white"
                }`}
              >
                <td className="py-4 px-4" style={{ border: "1px solid #0000004D" }}>
                  <div className="flex items-center gap-3">
                    <img
                      src={bid.bidder.image}
                      alt={bid.bidder.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className={`font-medium ${bid.rank === 61 ? "text-black" : "text-black"}`}>
                        {bid.rank}st Place
                      </p>
                      <p className={`text-md ${bid.rank === 61 ? "text-black" : "text-black"}`}>
                        {bid.bidder.name}
                        {bid.bidder.isYou && (
                          <span className={`ml-1 ${bid.rank === 61 ? "text-black" : "text-autogemz-orange"}`}>(You)</span>
                        )}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4" style={{ border: "1px solid #0000004D" }}>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${bid.rank === 61 ? "text-black" : "text-black"}`}>
                      RS: {bid.bid}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4" style={{ border: "1px solid #0000004D" }}>
                  <span className={`text-md font-medium ${bid.rank === 61 ? "text-black" : "text-black"}`}>
                    {bid.placed}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidActivity;
