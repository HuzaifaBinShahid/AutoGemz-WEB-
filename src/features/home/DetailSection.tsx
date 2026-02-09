import Image from 'next/image'
import React from 'react'

const DetailSection = () => {
    return (
        <div className='h-screen bg-no-repeat  w-full flex flex-col items-center bg-white dark:bg-black py-[21px] ' style={{ backgroundImage: 'url(/images/MockImage.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <h2 className="font-display font-semibold text-2xl md:text-[30px] lg:text-[56px] leading-[40px] md:leading-[50px] tracking-[1px] lg:uppercase text-center text-black dark:text-white">
                GET A DETAILED CAR REPORT
                <br />
                BEFORE YOU BUY
            </h2>

            {/* Button */}
            <button className="bg-[#EA4335] hover:bg-[#EA4335]/90 text-white font-display  mt-[30px] font-semibold text-sm md:text-base uppercase tracking-wide px-8 py-3 md:px-10 md:py-4 transition-colors duration-200">
                BOOK INSPECTION BEFORE AUCTION
            </button>


        </div>
    )
}

export default DetailSection