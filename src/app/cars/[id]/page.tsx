import BidScreen from "@/features/bid-screen";
import React from "react";

interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CarDetailPage = async ({ params }: CarDetailPageProps) => {
  const { id } = await params;
  return <BidScreen carId={id} />;
};

export default CarDetailPage;

