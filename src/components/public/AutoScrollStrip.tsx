"use client";

interface AutoScrollStripProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
  cardClassName?: string;
}

export default function AutoScrollStrip<T>({
  items,
  getKey,
  renderCard,
  cardClassName = "w-[300px] shrink-0 sm:w-[320px]",
}: AutoScrollStripProps<T>) {
  if (items.length === 0) return null;

  const loopItems = [...items, ...items];

  return (
    <div className="-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 touch-pan-y">
      <div className="flex w-max animate-marquee-left gap-4 py-1 hover:[animation-play-state:paused]">
        {loopItems.map((item, index) => (
          <div key={`${getKey(item)}-${index}`} className={cardClassName}>
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
