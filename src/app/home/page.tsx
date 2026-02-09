import DetailSection from '@/features/home/DetailSection'
import LatestNewsSection from '@/features/home/LatestNewsSection'
import AppDownloadSection from '@/features/sale-your-car/AppDownloadSection'
import React from 'react'
import JoinSection from '@/features/home/JoinSection'
import HowItWorksSection from '@/features/home/HowItWorksSection'
import CurrentAuctionsSection from '@/features/home/CurrentAuctionsSection'
import { dummyBlogPosts, CURRENT_AUCTIONS } from '@/constants/constants'
import HomeHeader from '@/features/home/Header'



const Home = () => {
    return (
        <div className=' '>
            <HomeHeader />
            <div className='px-5'>
                <hr className=' my-[61px] md:mb-3 border-2 bg-[#0000004D]  ' />
            </div>
            <CurrentAuctionsSection auctions={CURRENT_AUCTIONS} />
            <div className='px-5'>
                <hr className=' mt-[61px] md:mb-3 mb-[61px] border-2 bg-[#0000004D]  ' />
            </div>
            <HowItWorksSection />
            <div className='px-5'>
                <hr className=' mt-[61px] mb-3 border-2 bg-[#0000004D]  ' />
            </div>

            <LatestNewsSection className='!py-0 ' posts={dummyBlogPosts} title="LATEST NEWS" limit={4} />
            <div className='px-5'>
                <hr className=' mt-[61px] mb-3 border-2 bg-[#0000004D]  ' />
            </div>

            <DetailSection />
            <div className='px-5'>
                <hr className=' mt-[61px] mb-3 border-2 bg-[#0000004D]  ' />
            </div>
            <div className='px-[10px]'>
                <AppDownloadSection />
            </div>
            <div className='px-5'>
                <hr className=' mt-[61px] mb-3 border-2 bg-[#0000004D]  ' />
            </div>
            <div className='px-[10px]'>
                <JoinSection />
            </div>
        </div>
    )
}

export default Home