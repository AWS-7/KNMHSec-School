"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Baby,
  BookOpen,
  School,
  Users,
  ChevronDown,
} from "lucide-react";
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

const levelDetails: Record<string, string[]> = {
  "Pre-KG": [
    "Play-based learning with storytelling, rhymes, and creative activities",
    "Early social skills, sharing, and classroom routines",
    "Motor skills development through art, music, and movement",
    "Safe, nurturing environment for first school experience",
  ],
  LKG: [
    "Introduction to letters, numbers, shapes, and colors",
    "Phonics-based early literacy and spoken English activities",
    "Hands-on learning with puzzles, blocks, and group play",
    "Focus on confidence, curiosity, and communication",
  ],
  UKG: [
    "Reading readiness, basic writing, and number concepts",
    "Structured activities preparing children for primary grades",
    "Creative expression through drawing, craft, and role play",
    "Values education and discipline in daily routines",
  ],
  "Primary School": [
    "Classes 1 to 5 — Tamil, English, Mathematics, EVS, and more",
    "Concept-based teaching with activity-oriented lessons",
    "Regular assessments and personalized teacher support",
    "Co-curricular activities, sports, and cultural programs",
  ],
  "Middle School": [
    "Classes 6 to 8 — deeper subject knowledge across the curriculum",
    "Science, Mathematics, Social Science, and Languages",
    "Project work, lab sessions, and skill-building activities",
    "Leadership opportunities and inter-school participation",
  ],
  "High School": [
    "Classes 9 and 10 — board exam focused preparation",
    "Strong foundation in core subjects with regular tests",
    "Study skills, time management, and exam strategies",
    "Career awareness and guidance for next-level choices",
  ],
  "Higher Secondary": [
    "Classes 11 and 12 — Science, Commerce, and Arts streams",
    "Expert faculty support for board and competitive readiness",
    "Practical labs, projects, and stream-specific coaching",
    "Career counselling and higher education guidance",
  ],
};

const iconMap: Record<string, React.ReactNode> = {
  "Pre-KG": <Baby className="h-6 w-6" />,
  LKG: <Baby className="h-6 w-6" />,
  UKG: <BookOpen className="h-6 w-6" />,
  "Primary School": <BookOpen className="h-6 w-6" />,
  "Middle School": <School className="h-6 w-6" />,
  "High School": <GraduationCap className="h-6 w-6" />,
  "Higher Secondary": <Users className="h-6 w-6" />,
};

export default function AcademicsSection({ data }: Props) {
  const levels = data.length > 0 ? data : defaultLevels;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
          {levels.map((level, index) => {
            const isExpanded = expandedId === level.id;
            const bullets = levelDetails[level.title] || [];

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {iconMap[level.title] || <BookOpen className="h-6 w-6" />}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {level.title}
                </h3>
                <p
                  className={`text-sm text-muted-foreground leading-relaxed ${
                    isExpanded ? "" : "line-clamp-2"
                  }`}
                >
                  {level.description}
                </p>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {bullets.length > 0 && (
                        <ul className="mt-4 space-y-2 border-t border-border pt-4">
                          {bullets.map((point) => (
                            <li
                              key={point}
                              className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => toggleExpand(level.id)}
                  aria-expanded={isExpanded}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {isExpanded ? "Show Less" : "Learn More"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
