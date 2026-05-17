"use client";

import { motion } from "framer-motion";
import { Megaphone, ChevronRight } from "lucide-react";
import type { Announcement } from "@/types";

interface Props {
  data: Announcement[];
}

const defaultAnnouncements: Announcement[] = [
  { id: "1", title: "Admissions Open 2026–2027", content: "Apply now for the upcoming academic year.", priority: "High", is_active: true },
  { id: "2", title: "Quarterly Exams Start June 10", content: "All students are requested to prepare accordingly.", priority: "High", is_active: true },
  { id: "3", title: "Annual Day Photos Uploaded", content: "View the gallery section for event highlights.", priority: "Medium", is_active: true },
  { id: "4", title: "PTA Meeting Announcement", content: "Parent-Teacher meeting scheduled for next month.", priority: "Medium", is_active: true },
];

export default function AnnouncementsTicker({ data }: Props) {
  const items = data.length > 0 ? data : defaultAnnouncements;

  return (
    <div className="bg-secondary/10 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground shrink-0">
            <Megaphone className="h-3.5 w-3.5" />
            Latest
          </span>
          <div className="overflow-hidden flex-1">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...items, ...items].map((item, index) => (
                <span
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80 shrink-0"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-secondary shrink-0" />
                  <span className="font-medium">{item.title}</span>
                  <span className="text-muted-foreground hidden sm:inline">
                    — {item.content}
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
