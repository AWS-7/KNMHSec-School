"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/types";

interface Props {
  data: GalleryImage[];
}

export default function GallerySection({ data }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = () => setSelectedIndex(null);
  const prev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? data.length - 1 : selectedIndex - 1);
    }
  };
  const next = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === data.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const validImages = data.filter((img) => img.image_url);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Gallery
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Moments That Inspire
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A glimpse into the vibrant life at Chatriya Nadar Matriculation HSS.
          </p>
        </motion.div>

        {validImages.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {validImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-muted"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {image.title}
                  </h3>
                  <p className="text-sm text-white/80">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>Images will appear here once uploaded via the admin dashboard.</p>
          </div>
        )}

        <AnimatePresence>
          {selectedIndex !== null && validImages[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
              onClick={close}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <div className="relative max-h-[80vh] max-w-5xl w-full aspect-[4/3]">
                <Image
                  src={validImages[selectedIndex].image_url}
                  alt={validImages[selectedIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
              <button
                onClick={close}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                <h3 className="font-serif text-xl font-semibold">
                  {validImages[selectedIndex].title}
                </h3>
                <p className="text-sm text-white/80">
                  {validImages[selectedIndex].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
