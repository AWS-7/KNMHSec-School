"use client";

import { motion } from "framer-motion";
import { Megaphone, Calendar, ArrowRight } from "lucide-react";
import type { Announcement } from "@/types";

interface Props {
  data: Announcement[];
}

const defaultAnnouncements: Announcement[] = [
  { id: "1", title: "Admissions Open 2026–2027", content: "Enrollments are now open for all classes from Pre-KG to 12th Standard. Secure your child's future today.", priority: "High", is_active: true },
  { id: "2", title: "Quarterly Exams Start June 10", content: "Students are advised to collect their hall tickets and follow the examination schedule strictly.", priority: "High", is_active: true },
  { id: "3", title: "Annual Day Photos Uploaded", content: "Relive the memorable moments of our Annual Day celebration. Visit the gallery section.", priority: "Medium", is_active: true },
  { id: "4", title: "PTA Meeting Announcement", content: "A joint Parent-Teacher meeting will be held to discuss student progress and upcoming plans.", priority: "Medium", is_active: true },
];

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function LatestAnnouncements({ data }: Props) {
  const items = data.length > 0 ? data : defaultAnnouncements;

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Updates
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Latest Announcements
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Stay informed with the latest news and updates from our school.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-secondary/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Megaphone className="h-5 w-5" />
                </div>
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    priorityStyles[item.priority] || priorityStyles.Medium
                  }`}
                >
                  {item.priority}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {item.content}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Recently"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-b-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
