import { useState } from "react";

const AccountSecurity = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <h3
        className="text-xl font-semibold text-gray-900 mb-6"
        style={{
          fontFamily: "'Chakra Petch', sans-serif",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "0.14em",
          verticalAlign: "middle",
        }}
      >
        Account Security
      </h3>

      <div className="space-y-6">
        <div className="flex items-center gap-4 w-[70%]">
          <div className="flex-1">
            <label
              className="block mb-2 text-base leading-6 text-[#111111]"
              style={{
                fontFamily: "'Mulish', sans-serif",
                fontWeight: 300,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value="**********"
              readOnly
              className="w-full px-4 py-3"
              style={{
                backgroundColor: "#0000000D",
                backdropFilter: "blur(5px)",
                border: "none",
                fontFamily: "'Mulish', sans-serif",
                color: "#00000096",
              }}
            />
          </div>
          <button
            className="px-4 py-3 uppercase font-semibold text-white transition-colors bg-autogemz-orange mt-6"
          >
            CHANGE PASSWORD
          </button>
        </div>

        <div className="flex items-center gap-6">
        <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              twoFactorEnabled ? "bg-autogemz-orange" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                twoFactorEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <label
            className="text-base leading-6 text-[#111111]"
            style={{
              fontFamily: "'Mulish', sans-serif",
              fontWeight: 300,
            }}
          >
            Two-Factor Authentication
          </label>
         
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
