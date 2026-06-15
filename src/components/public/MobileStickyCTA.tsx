"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileStickyCTA() {
  const scrollToAdmissions = () => {
    const element = document.getElementById("admissions");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3">
      <button
        type="button"
        onClick={scrollToAdmissions}
        aria-label="Admission enquiry"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-white/80 active:scale-95 transition-transform"
      >
        <Phone className="h-5 w-5" />
      </button>
      <a
        href="https://wa.me/914567232094"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-2 ring-white/80 active:scale-95 transition-transform"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
