const AutoGemzLeftSide = () => {
  const features = [
    "Light/dark mode toggle",
    "Redux toolkit and other utility libraries configured",
    "Calendar, Modal, Sidebar components",
    "User-friendly documentation",
    "Daisy UI components, Tailwind CSS support",
  ];

  return (
    <div
      className="flex-1 relative overflow-hidden"
      style={{
        backgroundColor: "#0000008C",
        borderRadius: "5px",
        boxShadow:
          "0px 9.11px 11.38px -6.83px #0000001A, 0px 22.76px 28.46px -5.69px #0000001A",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="relative z-10 flex flex-col justify-center items-start h-full p-12 text-white">
        <div className="mb-8">
          <img
            src="/assets/Logo/Icon Png.png"
            alt="AutoGemz"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-red-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutoGemzLeftSide;
