"use client";

import ClientLayout from "@/components/ClientLayout";
import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <Identity />
      <Showcase />
    </ClientLayout>
  );
}
