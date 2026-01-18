interface ContactInformationProps {
  mobileNumber: string;
  secondaryNumber: string;
  allowWhatsApp: boolean;
}

const ContactInformation = ({
  mobileNumber,
  secondaryNumber,
  allowWhatsApp,
}: ContactInformationProps) => {
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
          CONTACT INFORMATION
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Mobile Number:</span>
          <span className="font-semibold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {mobileNumber}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-semibold text-[18px] mb-1">Secondary Number:</span>
          <span className="font-semibold text-base leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0000008C" }}>
            {secondaryNumber}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          checked={allowWhatsApp}
          readOnly
          className="w-5 h-5 text-autogemz-orange"
          style={{ accentColor: "#DC3729" }}
        />
        <span className="text-black font-semibold text-[18px]">Allow WhatsApp Contact</span>
      </div>
    </div>
  );
};

export default ContactInformation;
