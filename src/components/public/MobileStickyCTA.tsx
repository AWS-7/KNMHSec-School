"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileStickyCTA() {
  const scrollToAdmissions = () => {
    const element = document.getElementById("admissions");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={scrollToAdmissions}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm active:scale-[0.98] transition-transform"
        >
          <Phone className="h-4 w-4" />
          Admission Enquiry
        </button>
        <a
          href="https://wa.me/914567232094"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
