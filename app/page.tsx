import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <Footer />
    </>
  );
}
