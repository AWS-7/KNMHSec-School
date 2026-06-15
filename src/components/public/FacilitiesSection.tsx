"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Library,
  Cpu,
  TreePine,
  Bus,
  FlaskConical,
  Mic,
} from "lucide-react";
import type { Facility } from "@/types";
import DualRowScrollStrip from "./DualRowScrollStrip";

interface Props {
  data: Facility[];
}

const defaultFacilities: Facility[] = [
  { id: "1", title: "Smart Classrooms", description: "Technology-enabled classrooms with digital boards and multimedia learning aids.", icon_name: "Monitor", order_index: 1 },
  { id: "2", title: "Library", description: "A vast collection of books, journals, and digital resources for holistic learning.", icon_name: "Library", order_index: 2 },
  { id: "3", title: "Computer Lab", description: "Modern computer lab with high-speed internet and latest software for IT education.", icon_name: "Cpu", order_index: 3 },
  { id: "4", title: "Playground", description: "Spacious playground for outdoor sports, physical training, and recreational activities.", icon_name: "TreePine", order_index: 4 },
  { id: "5", title: "Transport", description: "Safe and reliable school transport covering Kamuthi and surrounding areas.", icon_name: "Bus", order_index: 5 },
  { id: "6", title: "Science Lab", description: "Well-equipped Physics, Chemistry, and Biology labs for practical learning.", icon_name: "FlaskConical", order_index: 6 },
  { id: "7", title: "English Communication Training", description: "Dedicated programs to build confident English speaking and communication skills.", icon_name: "Mic", order_index: 7 },
];

const iconComponents: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="h-6 w-6" />,
  Library: <Library className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  TreePine: <TreePine className="h-6 w-6" />,
  Bus: <Bus className="h-6 w-6" />,
  FlaskConical: <FlaskConical className="h-6 w-6" />,
  Mic: <Mic className="h-6 w-6" />,
};

function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
        {iconComponents[facility.icon_name] || <Monitor className="h-6 w-6" />}
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5">
        {facility.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {facility.description}
      </p>
    </div>
  );
}

export default function FacilitiesSection({ data }: Props) {
  const facilities = data.length > 0 ? data : defaultFacilities;

  return (
    <section id="facilities" className="py-20 sm:py-28 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Facilities
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            World-Class Infrastructure
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            State-of-the-art facilities designed to support academic excellence, physical development, and creative expression.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            Swipe sideways to explore · Auto-scrolls continuously
          </p>
        </motion.div>

        <DualRowScrollStrip
          items={facilities}
          getKey={(f) => f.id}
          renderCard={(facility) => <FacilityCard facility={facility} />}
        />
      </div>
    </section>
  );
}
