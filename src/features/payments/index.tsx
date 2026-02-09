"use client";

import AmountIcon from "@/assets/svg/AmountIcon";
import Clander from "@/assets/svg/Clander";
import GlassmorphismWrapper from "@/components/common/GlassmorphismWrapper";
import type { Payment } from "@/interfaces";
import Image from "next/image";
import { useMemo, useState } from "react";
import { PAYMENT_SUMMARY_CARDS, PAYMENT_TABS } from "@/constants/constants";

interface PaymentsProps {
  payments: Payment[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
    case "completed":
      return "bg-green-500 text-white dark:bg-green-600";
    case "pending":
      return "bg-yellow-500 text-white dark:bg-yellow-600";
    case "in_process":
      return "bg-cyan-500 text-white dark:bg-cyan-600";
    case "failed":
      return "bg-red-500 text-white dark:bg-red-600";
    default:
      return "bg-gray-500 text-white dark:bg-gray-600";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "paid":
      return "Paid";
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "in_process":
      return "In Process";
    case "failed":
      return "Failed";
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatCurrency = (amount: number) => {
  return `PKR ${amount.toLocaleString()}`;
};

export default function Payments({ payments }: PaymentsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "payable" | "return">("all");

  // Calculate summary values
  const summary = useMemo(() => {
    const totalAmount = payments.reduce((sum, payment) => {
      if (payment.type === "payable" || !payment.type) {
        return sum + payment.amount;
      }
      return sum;
    }, 0);

    const remaining = payments
      .filter((p) => p.status === "pending" || p.status === "in_process")
      .reduce((sum, payment) => {
        if (payment.type === "payable" || !payment.type) {
          return sum + payment.amount;
        }
        return sum;
      }, 0);

    const returns = payments
      .filter((p) => p.type === "return")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return { totalAmount, remaining, returns };
  }, [payments]);

  // Filter payments based on active tab
  const filteredPayments = useMemo(() => {
    if (activeTab === "all") {
      return payments;
    }
    return payments.filter((payment) => payment.type === activeTab);
  }, [payments, activeTab]);

  // Summary cards configuration with values
  const summaryCards = PAYMENT_SUMMARY_CARDS.map((card) => ({
    ...card,
    value: summary[card.valueKey],
  }));

  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="w-full">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white dark:bg-black border border-gray-200 dark:border-[#FFFFFF1A] rounded-lg p-6 relative overflow-hidden"
              >
                {/* Large Background Icon */}
                <div className="absolute top-0 right-0 opacity-20 -translate-y-2 translate-x-2">
                  <IconComponent />
                </div>
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-[18px] font-bold text-[#737779] font-jakarta leading-[38.38px] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[24px] font-bold text-[#494949] font-jakarta leading-[38.38px]">
                    {formatCurrency(card.value)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabbed Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-[#FFFFFF1A]">
          <div className="flex space-x-8">
            {PAYMENT_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`pb-4 px-2 text-sm font-semibold uppercase font-display transition-colors ${activeTab === tab.value
                    ? "text-customRed border-b-2 border-customRed"
                    : "text-black dark:text-[#A5A5A5] hover:text-customRed dark:hover:text-customRed"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Entries */}
        <div className="space-y-6">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-black dark:text-[#A5A5A5]">No payments found</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <GlassmorphismWrapper key={payment.id} className="!p-3 bg-white dark:!bg-[#111111] !border-0 dark:!border">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Car Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-full md:w-[152.77px] h-[158.39px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      {payment.carImage ? (
                        <Image
                          src={payment.carImage}
                          alt={payment.carName || payment.description}
                          width={256}
                          height={192}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-600 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                      {/* Status Badge on Image - Mobile Only */}
                      <div className="absolute top-2 right-2 md:hidden z-10">
                        <span
                          className={`px-3 py-1 text-xs font-semibold uppercase ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {getStatusLabel(payment.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Payment Name and Info */}
                      <div className="flex items-start justify-between ">
                        <div>
                          <div className="flex items-center gap-1">
                            <div className="w-[3px] h-5 bg-customRed" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">
                              {payment.carName || payment.description}
                            </h3>
                          </div>

                          <div className="space-y-2 mt-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                              <Clander />
                              <span className="text-sm text-gray-500 dark:text-gray-400 font-display">
                                {formatDate(payment.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                              <AmountIcon />
                              <span className="text-sm text-gray-500 dark:text-gray-400 font-display">
                                <span>{formatCurrency(payment.amount)}</span>
                              </span>
                            </div>

                            {payment.transactionId && (
                              <div className="text-sm text-gray-700 dark:text-white">
                                <span className="font-semibold">TRANSACTION ID: </span>
                                <span>{payment.transactionId}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Tag and Action Buttons */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Status Badge - Desktop Only */}
                        <div className="hidden md:flex items-center gap-4">
                          <span
                            className={`px-3 py-1 text-xs font-semibold uppercase ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {getStatusLabel(payment.status)}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex  gap-3">
                          <button className="px-[34px] py-[14px] bg-customRed hover:bg-red-700 text-white font-semibold uppercase text-sm  transition-colors">
                            VIEW RECEIPT
                          </button>
                          <button className="px-6 py-2 border-2 border-customRed text-customRed hover:bg-customRed hover:text-white font-semibold uppercase text-sm  transition-colors">
                            VIEW DETAILS
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassmorphismWrapper>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
