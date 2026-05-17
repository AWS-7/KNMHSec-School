"use client";

import { motion } from "framer-motion";
import { GraduationCap, Baby, BookOpen, School, Users } from "lucide-react";
import type { AcademicLevel } from "@/types";

interface Props {
  data: AcademicLevel[];
}

const defaultLevels: AcademicLevel[] = [
  { id: "1", title: "Pre-KG", description: "A joyful start to learning with play-based activities, storytelling, and early social skills development.", order_index: 1 },
  { id: "2", title: "LKG", description: "Foundational literacy and numeracy through interactive and creative teaching methods.", order_index: 2 },
  { id: "3", title: "UKG", description: "Building confidence in reading, writing, and arithmetic with structured play learning.", order_index: 3 },
  { id: "4", title: "Primary School", description: "Classes 1 to 5 with strong conceptual understanding in core subjects and emphasis on curiosity.", order_index: 4 },
  { id: "5", title: "Middle School", description: "Classes 6 to 8 expanding horizons with deeper subject knowledge, projects, and co-curricular activities.", order_index: 5 },
  { id: "6", title: "High School", description: "Classes 9 to 10 with rigorous preparation for board examinations and analytical thinking.", order_index: 6 },
  { id: "7", title: "Higher Secondary", description: "Classes 11 to 12 with specialized streams in Science, Commerce, and Arts with career guidance.", order_index: 7 },
];

const iconMap: Record<string, React.ReactNode> = {
  "Pre-KG": <Baby className="h-6 w-6" />,
  "LKG": <Baby className="h-6 w-6" />,
  "UKG": <BookOpen className="h-6 w-6" />,
  "Primary School": <BookOpen className="h-6 w-6" />,
  "Middle School": <School className="h-6 w-6" />,
  "High School": <GraduationCap className="h-6 w-6" />,
  "Higher Secondary": <Users className="h-6 w-6" />,
};

export default function AcademicsSection({ data }: Props) {
  const levels = data.length > 0 ? data : defaultLevels;

  return (
    <section id="academics" className="py-20 sm:py-28 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Academics
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From Pre-KG to 12th Standard
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A comprehensive curriculum designed to foster intellectual curiosity, critical thinking, and lifelong learning at every stage.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {iconMap[level.title] || <BookOpen className="h-6 w-6" />}
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {level.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {level.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
