"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("cnmhss-loaded");
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("cnmhss-loaded", "true");
          }, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-secondary">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary-foreground tracking-tight text-center px-4">
              Chatriya Nadar
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary-foreground/60 text-center">
              Matriculation Higher Secondary School
            </p>
            <p className="mt-2 text-sm italic text-primary-foreground/50 text-center">
              Excellence in Education, Character, and Service
            </p>
          </motion.div>

          <div className="mt-10 w-48">
            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-3 text-center text-xs text-primary-foreground/40 font-medium">
              Loading...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
