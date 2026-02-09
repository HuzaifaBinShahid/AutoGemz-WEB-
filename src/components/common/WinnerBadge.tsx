import React from 'react';
import TrophyIcon from '@/assets/svg/TrophyIcon';

const WinnerBadge: React.FC = () => {
  return (
    <div 
      className="w-full max-w-[640px] h-[53px] mx-auto md:h-[103px] bg-customGreen flex items-center justify-center gap-2 sm:gap-3 md:gap-[17px] py-2 sm:py-3 md:py-[15px] px-4 sm:px-8 md:px-[74px] font-display"
    >
      <div className="">
        <TrophyIcon width="35" height="35" />
      </div>
      <span className="text-white font-display font-semibold text-2xl sm:text-4xl md:text-[56px] leading-none uppercase align-middle whitespace-nowrap">
        WINNER
      </span>
    </div>
  );
};

export default WinnerBadge;

