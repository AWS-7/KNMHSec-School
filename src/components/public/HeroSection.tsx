"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award, BookOpen, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import type { GalleryImage, HeroSection as HeroSectionType } from "@/types";

interface Props {
  data: HeroSectionType | null;
  galleryImages?: GalleryImage[];
}

const trustChips = [
  { icon: GraduationCap, label: "Pre-KG to XII" },
  { icon: BookOpen, label: "Holistic Learning" },
  { icon: Award, label: "Future Ready" },
];

function HeroMobileCarousel({
  images,
  bannerUrl,
}: {
  images: { url: string; alt: string }[];
  bannerUrl?: string;
}) {
  const slides =
    images.length > 0
      ? images
      : bannerUrl
        ? [{ url: bannerUrl, alt: "School campus" }]
        : [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:hidden" />
    );
  }

  return (
    <div className="relative mb-4 md:hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].url}
              alt={slides[index].alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      {slides.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.url}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-secondary" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroSection({ data, galleryImages = [] }: Props) {
  const heroTitle =
    data?.title || "Chatriya Nadar Matriculation Higher Secondary School";
  const heroSubtitle =
    data?.subtitle ||
    "Nurturing young minds with quality education, strong values, and holistic development from Pre-KG to 12th Standard.";
  const heroTagline =
    data?.tagline || "Excellence in Education, Character, and Service";

  const carouselImages = galleryImages
    .filter((img) => img.image_url)
    .slice(0, 6)
    .map((img) => ({ url: img.image_url, alt: img.title || "School gallery" }));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[68vh] items-end overflow-hidden bg-primary text-primary-foreground sm:min-h-[80vh] sm:items-center lg:min-h-[85vh]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#183554] to-[#0b1729] sm:hidden" />
      <div className="absolute inset-0 hidden sm:block">
        {data?.banner_image_url ? (
          <Image
            src={data.banner_image_url}
            alt="School campus"
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary via-[#183554] to-[#0b1729]" />
        )}
      </div>
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/80 via-primary/65 to-primary/25 sm:block" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center lg:text-left"
        >
          <HeroMobileCarousel
            images={carouselImages}
            bannerUrl={data?.banner_image_url}
          />

          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm lg:mx-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
            <span className="font-medium text-white/90 sm:text-white/90">
              Kamuthi, Tamil Nadu
            </span>
          </div>

          <h1 className="mt-4 font-serif text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-white text-balance sm:mt-6 sm:text-5xl sm:leading-[1.08] lg:text-7xl">
            {heroTitle}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/85 line-clamp-3 sm:mt-5 sm:text-lg sm:leading-8 sm:line-clamp-none lg:mx-0">
            {heroSubtitle}
          </p>

          <p className="mx-auto mt-2 max-w-xl text-xs italic text-secondary sm:mt-3 sm:text-base lg:mx-0">
            &ldquo;{heroTagline}&rdquo;
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("facilities")}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 text-sm font-semibold text-secondary-foreground shadow-lg sm:w-auto sm:px-6"
            >
              {data?.cta_primary || "Explore Campus"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm sm:w-auto sm:px-6"
            >
              {data?.cta_secondary || "Contact School"}
            </button>
          </div>

          <div className="mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 lg:justify-start">
            {trustChips.map(({ icon: Icon, label }, index) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
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
