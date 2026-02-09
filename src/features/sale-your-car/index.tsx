import SaleYourCarInstant from "@/features/sale-your-car/SaleYourCarInstant";
import SaleYourCar3Step from "@/features/sale-your-car/SaleYourCar3Step";

interface SaleYourCarProps {
  variant?: "instant" | "3step";
  editVehicleId?: string;
}

export default function SaleYourCar({ variant = "instant", editVehicleId }: SaleYourCarProps) {
  // Conditionally render based on variant prop
  if (variant === "3step") {
    return <SaleYourCar3Step editVehicleId={editVehicleId} />;
  }

  // Default to instant offer version
  return <SaleYourCarInstant editVehicleId={editVehicleId} />;
}

