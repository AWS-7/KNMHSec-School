"use client";

import { useEffect, useRef, useState } from "react";

interface DualRowScrollStripProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderCard: (item: T) => React.ReactNode;
  cardClassName?: string;
}

function ScrollRow<T>({
  items,
  getKey,
  renderCard,
  direction,
  cardClassName = "w-[280px] shrink-0 sm:w-[300px]",
}: {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderCard: (item: T) => React.ReactNode;
  direction: "left" | "right";
  cardClassName?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loopItems = [...items, ...items];

  const pauseBriefly = () => {
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 3500);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || paused || items.length === 0) return;

    if (direction === "right" && el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 2;
    }

    let frameId = 0;
    const speed = direction === "left" ? 0.6 : -0.6;

    const tick = () => {
      if (!scrollRef.current) return;
      const node = scrollRef.current;
      node.scrollLeft += speed;

      const half = node.scrollWidth / 2;
      if (direction === "left" && node.scrollLeft >= half) {
        node.scrollLeft -= half;
      }
      if (direction === "right" && node.scrollLeft <= 0) {
        node.scrollLeft += half;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [paused, direction, items.length]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide touch-pan-x cursor-grab active:cursor-grabbing"
      onScroll={pauseBriefly}
      onTouchStart={pauseBriefly}
      onMouseDown={pauseBriefly}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex w-max gap-4 py-1">
        {loopItems.map((item, index) => (
          <div key={`${getKey(item, index)}-${index}`} className={cardClassName}>
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DualRowScrollStrip<T>({
  items,
  getKey,
  renderCard,
  cardClassName,
}: DualRowScrollStripProps<T>) {
  if (items.length === 0) return null;

  const midpoint = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, midpoint);
  const rowTwo = items.slice(midpoint);
  const rowTwoItems = rowTwo.length > 0 ? rowTwo : rowOne;

  return (
    <div className="space-y-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      <ScrollRow
        items={rowOne}
        getKey={getKey}
        renderCard={renderCard}
        direction="left"
        cardClassName={cardClassName}
      />
      <ScrollRow
        items={rowTwoItems}
        getKey={getKey}
        renderCard={renderCard}
        direction="right"
        cardClassName={cardClassName}
      />
    </div>
  );
}
