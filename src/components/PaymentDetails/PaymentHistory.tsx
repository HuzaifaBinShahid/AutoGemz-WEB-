interface PaymentHistoryItem {
  date: string;
  amount: string;
  status: "COMPLETED" | "REFUNDED" | "PENDING";
  transactionId: string;
}

interface PaymentHistoryProps {
  payments: PaymentHistoryItem[];
}

const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  const statusColors: Record<PaymentHistoryItem["status"], string> = {
    COMPLETED: "#3EB549",
    REFUNDED: "#DC3729",
    PENDING: "#F59E0B",
  };

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
        <h3 className="uppercase font-bold text-base leading-6 text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          PAYMENT HISTORY
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">DATE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">AMOUNT</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">STATUS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">TRANSACTION ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-4 text-black">{payment.date}</td>
                <td className="py-4 px-4 text-black">{payment.amount}</td>
                <td className="py-4 px-4">
                  <span
                    className="inline-block px-3 py-1 rounded text-sm font-medium text-white"
                    style={{ backgroundColor: statusColors[payment.status] }}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-black">{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
