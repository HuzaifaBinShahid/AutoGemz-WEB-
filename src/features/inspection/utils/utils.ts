export const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "text-green-500";
    case "error":
      return "text-red-500";
    case "warning":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export const getSubLabel = (categoryName: string): string => {
  if (categoryName.includes("ACCIDENT") || categoryName.includes("SUSPENSION") || categoryName.includes("EXTERIOR") || categoryName.includes("TEST DRIVE")) {
    return "CHECK LIST";
  } else if (categoryName === "BRAKES") {
    return "MECHANICAL CHECK";
  } else if (categoryName === "AC / HEATER") {
    return "AC / HEATER CHECK UP";
  }
  return "CHECK UP";
};

