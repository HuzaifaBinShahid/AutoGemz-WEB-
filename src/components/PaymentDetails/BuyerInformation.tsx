interface BuyerInformationProps {
    name: string;
    avatar: string;
    contact: string;
    email: string;
    location: string;
}

const BuyerInformation = ({
    name,
    avatar,
    contact,
    email,
    location,
}: BuyerInformationProps) => {
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
                    BUYER INFORMATION
                </h3>
            </div>
            <div className="flex justify-between">


                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-black font-semibold text-lg">{name}</span>
                </div>

                <div>
                    <p className="text-[#0000008C] text-[16px] font-semibold">Contact:</p>
                    <p className="text-[#0000008C] text-[16px] font-semibold">{contact}</p>
                </div>
                <div>
                    <p className="text-[#0000008C] text-[16px] font-semibold">Email:</p>
                    <p className="text-[#0000008C] text-[16px] font-semibold">{email}</p>
                </div>
                <div>
                    <p className="text-[#0000008C] text-[16px] font-semibold">Location:</p>
                    <p className="text-[#0000008C] text-[16px] font-semibold">{location}</p>
                </div>


            </div>
        </div>
    );
};

export default BuyerInformation;
