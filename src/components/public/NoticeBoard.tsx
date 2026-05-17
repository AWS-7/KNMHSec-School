"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Download, X, Pin, AlertCircle, FileText } from "lucide-react";
import type { NoticeBoard as NoticeBoardType } from "@/types";

interface Props {
  data: NoticeBoardType[];
}

const defaultNotices: NoticeBoardType[] = [
  {
    id: "1",
    title: "Holiday Circular — Summer Vacation 2026",
    description: "The school will remain closed from April 15 to May 31, 2026 for summer vacation. Classes will resume on June 1, 2026.",
    pdf_url: "",
    is_important: true,
    expiry_date: "2026-06-01",
  },
  {
    id: "2",
    title: "Exam Timetable — Quarterly Examination",
    description: "The quarterly examination timetable for all classes has been published. Students must report 15 minutes before the exam time.",
    pdf_url: "",
    is_important: true,
    expiry_date: "2026-06-20",
  },
  {
    id: "3",
    title: "Admission Circular 2026–2027",
    description: "Admissions are open for Pre-KG to 9th Standard. Application forms are available at the school office and online.",
    pdf_url: "",
    is_important: false,
    expiry_date: "2026-03-31",
  },
  {
    id: "4",
    title: "PTA Meeting — General Body",
    description: "All parents are invited to attend the General Body PTA Meeting to discuss the academic year plans and budget.",
    pdf_url: "",
    is_important: false,
    expiry_date: "2026-04-15",
  },
];

export default function NoticeBoard({ data }: Props) {
  const notices = data.length > 0 ? data : defaultNotices;
  const [selected, setSelected] = useState<NoticeBoardType | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Notices
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            School Notice Board
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Important circulars, announcements, and official notices for students and parents.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelected(notice)}
              className={`group flex cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-sm ${
                notice.is_important
                  ? "border-l-4 border-l-red-500 border-border hover:border-red-200"
                  : "border-border hover:border-secondary/40"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {notice.is_important ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Pin className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ClipboardList className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {notice.title}
                  </h3>
                  {notice.is_important && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
                      <AlertCircle className="h-3 w-3" />
                      Urgent
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {notice.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  {notice.expiry_date && (
                    <span>Valid until {new Date(notice.expiry_date).toLocaleDateString("en-IN")}</span>
                  )}
                  {notice.pdf_url && (
                    <span className="inline-flex items-center gap-1 text-secondary hover:underline">
                      <FileText className="h-3 w-3" />
                      PDF
                    </span>
                  )}
                </div>
              </div>
              <ArrowIcon />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {selected.title}
                    </h3>
                    {selected.is_important && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        Important Notice
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {selected.description}
                </p>
                {selected.expiry_date && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Valid until: {new Date(selected.expiry_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
                {selected.pdf_url && (
                  <a
                    href={selected.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Circular
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-secondary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
