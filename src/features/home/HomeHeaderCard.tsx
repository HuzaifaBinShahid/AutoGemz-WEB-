import React from "react";

const HomeHeaderCard = () => {
  const features = [
    {
      title: "TRANSPARENCY",
      description:
        "Honest listings, fair bidding, and complete visibility at every step.",
    },
    {
      title: "EFFICIENCY",
      description:
        "Streamlined auctions designed for fast, smooth transactions.",
    },
    {
      title: "TRUSTWORTHINESS",
      description:
        "Verified sellers, secure payments, and reliable service you can count on.",
    },
  ];
  return (
    <div className="relative header-card-bg p-2 px-[23px] md:p-0 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="relative mt-10 md:mx-6">
            {/* Content container */}
            <div className="pl-4 md:pl-6 pr-4 md:pr-6">
              {/* Title section */}
              <div className="mb-4 md:mb-6 relative">
                {/* Red accent line - only with title */}
                <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-[3px] bg-customRed z-10" />
                <h2 className="font-display text-2xl md:text-[20px] xl:text-4xl font-bold uppercase text-black dark:text-white">
                  {feature.title}
                </h2>
              </div>

              {/* Description section */}
              <div>
                <p className="font-mulish md:text-sm text-xs lg:text-base text-black dark:text-white leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeHeaderCard;
