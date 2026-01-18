import { useState } from "react";

interface InspectionItem {
  label: string;
  status: string;
  statusType: "red" | "green";
  hasViewButton?: boolean;
}

interface InspectionSubSection {
  title?: string;
  items: InspectionItem[];
}

interface InspectionCategory {
  title: string;
  status: string;
  percentage: number;
  subSections?: InspectionSubSection[];
  items?: InspectionItem[];
}

interface InspectionCategoriesProps {
  categories: InspectionCategory[];
}

const InspectionCategories = ({ categories }: InspectionCategoriesProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {categories.map((category, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className="bg-white p-6"
            style={{
              boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
              borderRadius: "0",
            }}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-autogemz-orange"></div>
                <div>
                  <h3
                    className="uppercase font-medium text-[36px] leading-6 text-black mb-3"
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "32px",
                      letterSpacing: "0.14em",
                      verticalAlign: "middle",
                    }}
                  >
                    {category.title}
                  </h3>
                  <p className="text-sm text-autogemz-orange mt-1 font-medium uppercase">
                    {category.status} {category.percentage}%
                  </p>
                </div>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                style={{ color: isExpanded ? "#DC3729" : "#000000" }}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isExpanded && (
              <div className="mt-6 space-y-6">
                {category.subSections ? (
                  category.subSections.map((subSection, subIndex) => (
                    <div key={subIndex}>
                      {subSection.title && (
                        <h4
                          className="uppercase font-medium text-lg text-black mb-4"
                          style={{
                            fontFamily: "'Chakra Petch', sans-serif",
                            fontWeight: 600,
                            fontSize: "24px",
                            lineHeight: "32px",
                            letterSpacing: "0.14em",
                            verticalAlign: "middle",
                          }}
                        >
                          {subSection.title}
                        </h4>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subSection.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="p-4 flex flex-col"
                            style={{
                              backgroundColor:
                                item.statusType === "red" ? "#EFCECB" : "#D9EFCB87",
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-base text-black font-semibold mb-1">
                                  {item.label}
                                </p>
                                <p className="text-sm font-medium text-[#0000008C]">
                                  {item.status}
                                </p>
                              </div>
                              {item.hasViewButton && (
                                <button
                                  className="px-3 py-1 text-sm font-medium text-white ml-2"
                                  style={{ backgroundColor: "#DC3729" }}
                                >
                                  VIEW
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : category.items ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-4 flex flex-col"
                        style={{
                          backgroundColor:
                            item.statusType === "red" ? "#EFCECB" : "#D9EFCB87",
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-base text-black font-semibold mb-1">
                              {item.label}
                            </p>
                            <p className="text-sm font-medium text-[#0000008C]">
                              {item.status}
                            </p>
                          </div>
                          {item.hasViewButton && (
                            <button
                              className="px-3 py-1 text-sm font-medium text-white ml-2"
                              style={{ backgroundColor: "#DC3729" }}
                            >
                              VIEW
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InspectionCategories;
