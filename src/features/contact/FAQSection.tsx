"use client"

import { faqItems } from "@/constants/constants"
import { useState } from "react"
import { BiPlus } from "react-icons/bi"




export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="w-full  py-16 ">
      <div className="container mx-auto 2xl:px-10 xl:px-0 px-5">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-6 w-1 bg-customRed"></div>
            <p className="md:text-lg text-sm font-light font-display tracking-widest text-slate-600 dark:text-white uppercase">
              FIND ANSWERS TO YOUR MOST FREQUENTLY ASKED QUESTIONS
            </p>
          </div>
          <h2 className="block text-4xl w-full md:max-w-[800px] md:text-[56px] font-semibold font-display tracking-tight leading-tight text-black dark:text-white uppercase">
            HAVE QUESTIONS ABOUT OUR SERVICES? FAQ FOR ANSWERS
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.id}>
              {/* Question Item */}
              <div className="group flex items-stretch dark:border  dark:border-[#FFFFFF1A] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-[#020202] transition-colors">
                {/* Question */}
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="flex-1 md:px-6 md:py-6 px-3 py-4 text-left focus:outline-none"
                >
                  <p className="text-[12px] md:text-sm font-normal tracking-[1.4px] text-slate-800 font-display dark:text-slate-200 uppercase">{item.question}</p>
                </button>

                {/* Plus Button */}
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="flex items-center justify-center bg-customRed px-6 py-6 hover:bg-customRed transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
                  aria-expanded={expandedId === item.id}
                  aria-label={`Toggle answer for: ${item.question}`}
                >
                  <BiPlus
                    size={24}
                    className="text-white transition-transform duration-300 ease-in-out"
                    style={{
                      transform: expandedId === item.id ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
              </div>

              {expandedId === item.id && (
                <div className="dark:border  dark:border-[#FFFFFF1A] bg-white dark:bg-[#111111] p-6 r animate-in fade-in duration-300">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base font-mulish">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
