"use client";

import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "1234567890", // Default phone number - replace with your actual number
  message = "Hello! I need help.",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    // Encode the message
    const encodedMessage = encodeURIComponent(message);
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </button>
  );
}

