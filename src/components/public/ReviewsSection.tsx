"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import DualRowScrollStrip from "./DualRowScrollStrip";

interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Mrs. Lakshmi",
    role: "Parent of Class X Student",
    text: "Our child has grown in confidence and discipline. The teachers genuinely care about every student's progress and well-being.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mr. Karthik",
    role: "Parent of Class VIII Student",
    text: "Excellent academic environment with strong values. The school balances studies, sports, and character building very well.",
    rating: 5,
  },
  {
    id: "3",
    name: "Mrs. Priya",
    role: "Parent of Class V Student",
    text: "Safe campus, supportive staff, and clear communication with parents. We are happy with the holistic approach to education.",
    rating: 5,
  },
  {
    id: "4",
    name: "Mr. Ramesh",
    role: "Parent of Class XII Student",
    text: "Board exam preparation and guidance from teachers helped our daughter achieve strong results. Highly recommended school.",
    rating: 5,
  },
  {
    id: "5",
    name: "Mrs. Anitha",
    role: "Parent of Class III Student",
    text: "The English communication program and classroom activities have made a visible difference in our child's learning journey.",
    rating: 5,
  },
  {
    id: "6",
    name: "Mr. Suresh",
    role: "Parent of Class VII Student",
    text: "Good infrastructure, transport facility, and a nurturing atmosphere. Chatriya Nadar School truly focuses on overall development.",
    rating: 5,
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
      <Quote className="h-8 w-8 text-secondary/40 mb-3" aria-hidden />
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" aria-hidden />
        ))}
      </div>
      <div className="mt-3 border-t border-border pt-3">
        <p className="font-semibold text-foreground text-sm">{review.name}</p>
        <p className="text-xs text-muted-foreground">{review.role}</p>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-muted overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Reviews
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Parents Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Trusted by families across Kamuthi for quality education and caring guidance.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            Swipe sideways to read more · Auto-scrolls continuously
          </p>
        </motion.div>

        <DualRowScrollStrip
          items={defaultReviews}
          getKey={(r) => r.id}
          renderCard={(review) => <ReviewCard review={review} />}
          cardClassName="w-[300px] shrink-0 sm:w-[320px]"
        />
      </div>
    </section>
  );
}
