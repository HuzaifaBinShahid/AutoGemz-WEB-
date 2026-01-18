interface PaymentBreakdownProps {
  totalAmount: string;
  amountPaid: string;
  returnAmount: string;
  remainingBalance: string;
  paymentMethod: string;
  referenceNo: string;
}

const PaymentBreakdown = ({
  totalAmount,
  amountPaid,
  returnAmount,
  remainingBalance,
  paymentMethod,
  referenceNo,
}: PaymentBreakdownProps) => {
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
          PAYMENT BREAKDOWN
        </h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-black">Total Amount:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {totalAmount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Amount Paid:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {amountPaid}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Return (If Any):</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {returnAmount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Remaining Balance:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {remainingBalance}
          </span>
        </div>
        <div className="border-t border-dashed border-gray-300 my-4"></div>
        <div className="flex justify-between">
          <span className="text-black">Payment Method:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {paymentMethod}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Reference No:</span>
          <span className="font-bold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {referenceNo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentBreakdown;
