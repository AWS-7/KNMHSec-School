"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Languages,
  MapPin,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
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
  { icon: Shield, label: "Safe Campus" },
  { icon: Users, label: "Expert Faculty" },
  { icon: Trophy, label: "Sports & Arts" },
  { icon: Languages, label: "English Focus" },
  { icon: MapPin, label: "Kamuthi, Ramanathapuram" },
];

function TrustChip({
  icon: Icon,
  label,
}: {
  icon: typeof GraduationCap;
  label: string;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
      <Icon className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
      {label}
    </span>
  );
}

function HeroTrustMarquee() {
  const loopChips = [...trustChips, ...trustChips];

  return (
    <div className="mt-5 w-full overflow-hidden touch-pan-y sm:hidden">
      <div className="flex w-max gap-2 py-1 [animation:marquee-left_22s_linear_infinite]">
        {loopChips.map((chip, index) => (
          <TrustChip key={`${chip.label}-${index}`} icon={chip.icon} label={chip.label} />
        ))}
      </div>
    </div>
  );
}

function HeroCarousel({
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

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-white/10 sm:rounded-2xl lg:aspect-[5/6] lg:max-h-[520px]" />
    );
  }

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 shadow-xl sm:rounded-2xl lg:aspect-[5/6] lg:max-h-[520px]">
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
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:from-black/25" />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:inline-flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:inline-flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
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
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#183554] to-[#0b1729]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(197,160,89,0.14),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-3 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 w-full shrink-0 lg:order-2 lg:justify-self-end lg:max-w-[520px]"
          >
            <HeroCarousel
              images={carouselImages}
              bannerUrl={data?.banner_image_url}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 flex w-full flex-col items-start text-left lg:order-1 lg:max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
              <span className="font-medium text-white/90">Kamuthi, Tamil Nadu</span>
            </div>

            <h1 className="mt-3 w-full font-serif text-[1.5rem] font-semibold leading-[1.2] tracking-tight text-white sm:mt-4 sm:text-4xl sm:leading-[1.1] lg:text-6xl xl:text-7xl">
              {heroTitle}
            </h1>

            <p className="mt-3 w-full text-sm leading-6 text-white/85 sm:mt-4 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {heroSubtitle}
            </p>

            <p className="mt-2 w-full text-xs italic text-secondary sm:mt-3 sm:text-base">
              &ldquo;{heroTagline}&rdquo;
            </p>

            <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:gap-3">
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

            <div className="mt-5 hidden w-full flex-wrap items-start gap-2 sm:flex lg:justify-start">
              {trustChips.map(({ icon, label }, index) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                >
                  <TrustChip icon={icon} label={label} />
                </motion.span>
              ))}
            </div>

            <HeroTrustMarquee />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
