import React from "react";
import AboutUsHeader from "./AboutUsHeader";
import TrustTransparencySection from "./TrustTransparencySection";
import TeamSection from "./TeamSection";
import TrustedByCommunitySection from "./TrustedByCommunitySection";
import LatestNewsSection from "../home/LatestNewsSection";


const AboutUs = () => {
  return (
    <div className=" min-h-screen">
      <AboutUsHeader />
      <TrustTransparencySection />
      <TeamSection />
      <TrustedByCommunitySection />
      <LatestNewsSection />
    </div>
  );
};

export default AboutUs;

