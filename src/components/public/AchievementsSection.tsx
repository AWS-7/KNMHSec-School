"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star } from "lucide-react";
import type { Achievement } from "@/types";

interface Props {
  data: Achievement[];
}

const defaultAchievements: Achievement[] = [
  { id: "1", title: "100% Board Results", description: "Consistent 100% pass percentage in 10th and 12th board examinations for over a decade.", category: "Academic", year: "2024", order_index: 1 },
  { id: "2", title: "State Level Sports Champions", description: "Our athletics team secured first place in the Tamil Nadu State Inter-School Athletics Meet.", category: "Sports", year: "2024", order_index: 2 },
  { id: "3", title: "Science Fair Winners", description: "Students won the top award at the Regional Science Exhibition for innovative renewable energy project.", category: "Academic", year: "2023", order_index: 3 },
  { id: "4", title: "Best School Award", description: "Recognized by the district administration for excellence in education and infrastructure.", category: "Institution", year: "2023", order_index: 4 },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Academic: <Star className="h-5 w-5" />,
  Sports: <Medal className="h-5 w-5" />,
  Institution: <Trophy className="h-5 w-5" />,
};

export default function AchievementsSection({ data }: Props) {
  const achievements = data.length > 0 ? data : defaultAchievements;

  return (
    <section id="achievements" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Achievements
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pride & Excellence
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Celebrating the remarkable accomplishments of our students and institution.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                {categoryIcons[item.category] || <Trophy className="h-5 w-5" />}
              </div>
              <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground mb-3">
                {item.year}
              </span>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
