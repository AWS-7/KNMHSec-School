"use client";

import { motion } from "framer-motion";
import { Calendar, FileCheck, ClipboardList, ArrowRight } from "lucide-react";

export default function AdmissionsSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="admissions" className="py-20 sm:py-28 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Admissions
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Begin Your Journey With Us
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
              We welcome students from all backgrounds who are eager to learn and grow. Our admission process is transparent and designed to identify students who will thrive in our nurturing environment.
            </p>
            <button
              onClick={scrollToContact}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-transform hover:scale-105"
            >
              Enquire Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-4 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">Eligibility</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Open to all students meeting age requirements and academic prerequisites for the respective grade. Transfer students welcome.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">Documents Required</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Birth certificate, previous school records, transfer certificate, passport photographs, and address proof.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">Important Dates</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Admissions open in March every year. Entrance assessments and interviews scheduled in April. Academic year begins in June.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
