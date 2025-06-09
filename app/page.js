"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BillingPlans from "@/app/(main)/billing/_components/BillingPlans";
import { Clock, BarChart2, UserCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/services/supabseClient"; // Make sure this import is correct

const rotatingPhrases = [
  "Hiring Navigator",
  "Hiring Copilot",
  "Screening Bot",
  "Screening Assistant",
  "Smart Recruiter",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Listen to Supabase auth state
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-[100vh] bg-[#f8f9fb] flex flex-col relative overflow-x-hidden">
      {/* Modern blurred gradient background */}
      <div className="absolute inset-0 w-full h-[100vh] z-0 pointer-events-none">
        {/* Gradient */}
        <div
          className="absolute -top-32 -left-32 w-[1000px] h-[100vh] rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-purple-300 opacity-20 blur-3xl"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 w-full h-[100vh] z-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <svg
          className="w-full h-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#d7dbe0"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Blur effect at the bottom of the grid */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 "
          style={{
            background: "linear-gradient(to bottom, rgba(248,249,251,0) 0%, #f8f9fb 100%)",
            filter: "blur(8px)",
            zIndex: 2,
          }}
        />
      </div>

      {/* Modern pill header */}
      <header
        className="relative z-30 flex justify-center"
        style={{ marginTop: "24px" }}
      >
        <div
          className="fixed top-4 flex items-center justify-between gap-8 px-8 py-3 bg-white rounded-full shadow-lg border border-gray-200 pointer-events-auto"
          style={{ minWidth: 320, maxWidth: 900, width: "90%" }}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AiCruitier Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-base font-medium text-gray-700">
            <button
              onClick={() => handleSmoothScroll("features")}
              className="hover:text-blue-600 transition bg-transparent border-none outline-none cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleSmoothScroll("howitworks")}
              className="hover:text-blue-600 transition bg-transparent border-none outline-none cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleSmoothScroll("pricing")}
              className="hover:text-blue-600 transition bg-transparent border-none outline-none cursor-pointer"
            >
              Pricing
            </button>
          </nav>
          <Button
            className="bg-blue-500 text-white font-medium px-5 py-2 rounded-full shadow hover:bg-blue-600 transition"
            onClick={() => router.push(isAuthenticated ? "/dashboard" : "/auth")}
          >
            Login / Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[100vh] w-full px-4 md:px-16 py-16 bg-transparent overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-2xl flex flex-col items-center justify-center text-center space-y-6 z-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight text-center">
            AI-Powered{" "}
            <span className="text-blue-600 font-extrabold inline-block min-w-[170px] align-middle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingPhrases[index]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {rotatingPhrases[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            for Modern Recruiters
          </h1>
          
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
          </p>
          
          <Button
            className="bg-gradient-to-r bg-blue-400 text-white px-16 py-4 font-semibold text-lg rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-500 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-150 flex items-center gap-2 mt-4"
            onClick={() => {
              if (isAuthenticated) {
                router.push("/dashboard/create-interview");
              } else {
                router.push("/auth");
              }
            }}
          >
            Create Interview
            <ArrowRight size={20} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Doodle Images */}
        <Image
          src="/1handshake.jpg"
          alt="Handshake"
          width={90}
          height={90}
          className="absolute top-25 left-120 opacity-40 pointer-events-none select-none z-10 md:w-[100px] md:h-[100px] w-[60px] h-[60px]"
          style={{ filter: "grayscale(1)" }}
        />
         <Image
          src="/8brain.png"
          alt="Handshake"
          width={90}
          height={90}
          className="absolute top-80 left-50 opacity-30 pointer-events-none select-none z-10 md:w-[100px] md:h-[100px] w-[60px] h-[60px]"
          style={{ filter: "grayscale(1)" }}
        />
        <Image
          src="/2paper plane.png"
          alt="Paper Plane"
          width={80}
          height={80}
          className="absolute top-18 right-80 opacity-50 pointer-events-none select-none z-10 md:w-[90px] md:h-[90px] w-[50px] h-[50px]"
          style={{ filter: "grayscale(1)" }}
        />
        <Image
          src="/3bubble.png"
          alt="Chat Bubble"
          width={70}
          height={70}
          className="absolute bottom-30 left-140 opacity-30 pointer-events-none select-none z-10 md:w-[70px] md:h-[70px] w-[40px] h-[40px]"
          style={{ filter: "grayscale(1)" }}
        />
        <Image
          src="/5headphones.png"
          alt="Brain"
          width={80}
          height={80}
          className="absolute bottom-40 right-20 opacity-30 pointer-events-none select-none z-10 md:w-[90px] md:h-[90px] w-[50px] h-[50px]"
          style={{ filter: "grayscale(1)" }}
        />
         
          <Image
          src="/7calender.png"
          alt="Brain"
          width={80}
          height={80}
          className="absolute bottom-90 right-90 opacity-90 pointer-events-none select-none z-10 md:w-[90px] md:h-[90px] w-[50px] h-[50px]"
          style={{ filter: "grayscale(1)" }}
        />
      </section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="w-full bg-white py-16 scroll-mt-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Streamline Your Hiring Process
          </h2>
          <p className="text-gray-500 mb-10 text-center max-w-2xl">
            AiCruitier helps you save time and find better candidates with our advanced AI interview technology.
          </p>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="bg-[#f8f9fb] border rounded-xl flex flex-col items-center p-8 flex-1 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-150">
              <Clock className="text-blue-600 mb-3" size={36} />
              <h3 className="font-semibold text-lg mb-2">Save Time</h3>
              <p className="text-gray-500 text-center text-base">
                Automate initial screening interviews and focus on final
                candidates.
              </p>
            </div>
            <div className="bg-[#f8f9fb] border rounded-xl flex flex-col items-center p-8 flex-1 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-150">
              <BarChart2 className="text-blue-600 mb-3" size={36} />
              <h3 className="font-semibold text-lg mb-2">Data-Driven Insights</h3>
              <p className="text-gray-500 text-center text-base">
                Get detailed analytics and candidate comparisons based on
                interview responses.
              </p>
            </div>
            <div className="bg-[#f8f9fb] border rounded-xl flex flex-col items-center p-8 flex-1 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-150">
              <UserCheck className="text-blue-600 mb-3" size={36} />
              <h3 className="font-semibold text-lg mb-2">Reduce Bias</h3>
              <p className="text-gray-500 text-center text-base">
                Standardized interviews help eliminate unconscious bias in the
                hiring process.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section
        id="howitworks"
        className="w-full bg-[#f3f6fa] py-16 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            How AiCruitier Works!
          </h2>
          <p className="text-gray-500 mb-10 text-center max-w-2xl">
            Three simple steps to transform your recruitment process
          </p>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="flex flex-col items-center flex-1">
              <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">
                Create Interview
              </h3>
              <p className="text-gray-500 text-center text-base">
                Set up your job requirements and customize interview questions.
              </p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">
                Share with Candidates
              </h3>
              <p className="text-gray-500 text-center text-base">
                Send interview links to candidates to complete at their
                convenience.
              </p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center">
                Review Results
              </h3>
              <p className="text-gray-500 text-center text-base">
                Get AI-analyzed results, transcripts, and candidate comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full bg-white py-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Pricing Plans
          </h2>
          <p className="text-gray-500 mb-10 text-center max-w-2xl">
            Choose the plan that best fits your hiring needs.
          </p>
          <BillingPlans />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-6 px-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Image
            src="/logo.png"
            alt="AiCruitier Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="font-semibold text-gray-900">AiCruitier</span>
        </div>
        <div className="flex gap-6 mb-2 md:mb-0">
          <a href="#" className="hover:text-blue-600 transition">
            Terms
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>
        </div>
        <div className="text-right">
          &copy; 2025 AiCruitier. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
