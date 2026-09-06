"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PlantScene = dynamic(() => import("./PlantScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-glass" />,
});

export default function HeroCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Suspense fallback={<div className="h-full w-full animate-pulse rounded-3xl bg-glass" />}>
        <PlantScene />
      </Suspense>
    </div>
  );
}
