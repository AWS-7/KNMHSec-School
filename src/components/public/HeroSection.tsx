"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import type { HeroSection as HeroSectionType } from "@/types";

interface Props {
  data: HeroSectionType | null;
}

export default function HeroSection({ data }: Props) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-20">
        {data?.banner_image_url ? (
          <Image
            src={data.banner_image_url}
            alt="School Banner"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary to-[#152a45]" />
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-secondary mb-6">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Kamuthi, Tamil Nadu, India
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            {data?.title || "Chatriya Nadar Matriculation Higher Secondary School"}
          </h1>

          <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
            {data?.subtitle ||
              "Nurturing young minds with quality education, strong values, and holistic development from Pre-KG to 12th Standard."}
          </p>

          <p className="mt-4 text-base text-primary-foreground/70 italic">
            {data?.tagline || "Excellence in Education, Character, and Service"}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection("facilities")}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-transform hover:scale-105"
            >
              {data?.cta_primary || "Explore Campus"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {data?.cta_secondary || "Contact School"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
