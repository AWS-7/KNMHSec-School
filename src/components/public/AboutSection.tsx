"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Target, Eye, Quote } from "lucide-react";
import type { AboutSection as AboutSectionType } from "@/types";

interface Props {
  data: AboutSectionType | null;
}

export default function AboutSection({ data }: Props) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            About Us
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Building Futures Since Generations
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              {data?.principal_image_url ? (
                <Image
                  src={data.principal_image_url}
                  alt="School Campus"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                  <BookOpen className="h-16 w-16" />
                </div>
              )}
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Our History
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {data?.history ||
                  "Established with a vision to provide quality education to the community of Kamuthi, Chatriya Nadar Matriculation Higher Secondary School has grown into one of the most respected institutions in the region. For decades, we have been committed to academic excellence and character formation."}
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-xl border border-border p-6 bg-card"
              >
                <Target className="h-8 w-8 text-secondary mb-3" />
                <h4 className="font-serif text-lg font-semibold mb-2">Mission</h4>
                <p className="text-sm text-muted-foreground">
                  {data?.mission ||
                    "To provide a nurturing environment that fosters academic excellence, moral values, and all-round development of every student."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-xl border border-border p-6 bg-card"
              >
                <Eye className="h-8 w-8 text-accent mb-3" />
                <h4 className="font-serif text-lg font-semibold mb-2">Vision</h4>
                <p className="text-sm text-muted-foreground">
                  {data?.vision ||
                    "To be a beacon of educational excellence, shaping responsible citizens and future leaders who contribute positively to society."}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-xl border-l-4 border-secondary bg-muted p-6"
            >
              <Quote className="h-6 w-6 text-secondary mb-2" />
              <p className="italic text-foreground mb-3">
                {data?.principal_message ||
                  "Education is not just about textbooks and exams. It is about shaping character, building confidence, and preparing young minds for the challenges of tomorrow."}
              </p>
              <p className="text-sm font-semibold text-foreground">
                &mdash; {data?.principal_name || "Principal, Chatriya Nadar Matriculation HSS"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
