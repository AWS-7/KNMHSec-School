"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import type { HeroSection as HeroSectionType } from "@/types";

interface Props {
  data: HeroSectionType | null;
}

const trustChips = [
  { icon: GraduationCap, label: "Pre-KG to XII" },
  { icon: BookOpen, label: "Holistic Learning" },
  { icon: Award, label: "Future Ready" },
];

export default function HeroSection({ data }: Props) {
  const heroTitle =
    data?.title || "Chatriya Nadar Matriculation Higher Secondary School";
  const heroSubtitle =
    data?.subtitle ||
    "Nurturing young minds with quality education, strong values, and holistic development from Pre-KG to 12th Standard.";
  const heroTagline =
    data?.tagline || "Excellence in Education, Character, and Service";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[72vh] items-center overflow-hidden bg-primary text-primary-foreground sm:min-h-[85vh]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {data?.banner_image_url ? (
          <Image
            src={data.banner_image_url}
            alt="School campus"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary via-[#183554] to-[#0b1729]" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-primary/60 to-primary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(197,160,89,0.12),transparent_55%)]" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center lg:text-left"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm lg:mx-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
            <span className="font-medium text-white/90">Kamuthi, Tamil Nadu</span>
          </div>

          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {heroTitle}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:mx-0">
            {heroSubtitle}
          </p>

          <p className="mx-auto mt-3 max-w-xl text-sm italic text-secondary sm:text-base lg:mx-0">
            &ldquo;{heroTagline}&rdquo;
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("facilities")}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground shadow-lg transition-colors hover:bg-secondary/90 sm:w-auto"
            >
              {data?.cta_primary || "Explore Campus"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:w-auto"
            >
              {data?.cta_secondary || "Contact School"}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {trustChips.map(({ icon: Icon, label }, index) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
                {label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
