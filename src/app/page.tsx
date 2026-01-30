"use client";

import { LangProvider } from "@/contexts/LangContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Values from "@/components/Values";
import Products from "@/components/Products";
import Story from "@/components/Story";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LangProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Values />
        <Products />
        <Story />
      </main>
      <Footer />
    </LangProvider>
  );
}
