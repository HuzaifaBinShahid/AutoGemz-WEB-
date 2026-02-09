"use client";

import React from "react";
import PageHeader from "@/components/common/PageHeader";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <PageHeader 
        title="TERMS & CONDITIONS" 
        backgroundImage="/images/BlogHeaderImage.png" 
      />
      
      <div className="container mx-auto px-4 py-16 2xl:px-8">
        <div className="max-w-4xl mx-auto">
          {/* INFORMATION WE COLLECT */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase font-display mb-6">
              INFORMATION WE COLLECT
            </h2>
            
            <div className="space-y-6 text-black dark:text-white">
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white uppercase font-display mb-3">
                  Personal Information
                </h3>
                <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish">
                  When you use our services, we may collect personal information that you provide directly to us, such as your name, email address, phone number, postal address, and payment information. This information is necessary to provide you with our services and to communicate with you about your account and transactions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white uppercase font-display mb-3">
                  Automatic Information
                </h3>
                <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish">
                  We automatically collect certain information when you visit our website, including your IP address, browser type, device information, and usage patterns. This information helps us improve our services and provide you with a better user experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white uppercase font-display mb-3">
                  Sensitive Information
                </h3>
                <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish">
                  We may collect sensitive information such as financial data, identification documents, and other information necessary for our services. We handle this information with the utmost care and in accordance with applicable privacy laws.
                </p>
              </div>
            </div>
          </section>

          {/* HOW WE USE YOUR INFORMATION */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase font-display mb-6">
              HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-[#A5A5A5] font-mulish ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Communicate with you about products, services, and promotional offers</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          {/* SHARING YOUR INFORMATION */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase font-display mb-6">
              SHARING YOUR INFORMATION
            </h2>
            <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-[#A5A5A5] font-mulish mt-4 ml-4">
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          {/* YOUR RIGHTS */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase font-display mb-6">
              YOUR RIGHTS
            </h2>
            <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-[#A5A5A5] font-mulish ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          {/* CONTACT INFORMATION */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase font-display mb-6">
              CONTACT INFORMATION & PRIVACY QUESTIONS
            </h2>
            <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish mb-4">
              If you have any questions about these Terms & Conditions or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-100 dark:bg-[#FFFFFF0D] border border-[#00000012] dark:border-[#FFFFFF1A] p-6 rounded-lg">
              <p className="text-base text-black dark:text-white font-mulish">
                <strong className="font-semibold">Email:</strong> privacy@autogemz.com
              </p>
              <p className="text-base text-black dark:text-white font-mulish mt-2">
                <strong className="font-semibold">Address:</strong> [Your Company Address]
              </p>
            </div>
          </section>

          {/* UPDATES TO TERMS */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase font-display mb-6">
              UPDATES TO TERMS
            </h2>
            <p className="text-base leading-relaxed text-black dark:text-[#A5A5A5] font-mulish">
              We may update these Terms & Conditions from time to time. We will notify you of any changes by posting the new Terms & Conditions on this page and updating the &quot;Last Updated&quot; date. You are advised to review this page periodically for any changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

