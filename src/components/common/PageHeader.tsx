import React from "react";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backgroundImage = "/images/BlogHeaderImage.png",
}) => {
  return (
    <div
      className="relative w-full lg:h-[557px] h-[350px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient overlay - adapts to dark/light mode */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(244, 244, 244, 0.3) 100%)",
        }}
      ></div>
      {/* Additional overlay for better text contrast - darker in dark mode, lighter in light mode */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70"></div>

      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-[35.55px] md:text-7xl lg:text-[90px] font-semibold text-white uppercase font-display drop-shadow-2xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

