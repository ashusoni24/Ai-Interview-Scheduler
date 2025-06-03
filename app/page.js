"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BillingPlans from "@/app/(main)/billing/_components/BillingPlans";
import { Clock, BarChart2, UserCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingPhrases = [
  "RecruitBot",
  "Hiring Copilot",
  "Screening Bot",
  "Talent Scout",
  "AI Recruiter",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
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
    <main className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-30 w-full flex items-center justify-between px-8 py-6
    bg-transparent transition-shadow ${scrolled ? "backdrop-blur-lg" : ""}`}
        style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="AiCruitier Logo"
            width={160}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-gray-700">
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
        {!isAuthenticated ? (
          <Button
            className="text-white hover:text-blue-600 transition font-medium cursor-pointer"
            onClick={() => router.push("/auth")}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer"
            onClick={() => {
              if (isAuthenticated) {
                router.push("/dashboard");
              } else {
                router.push("/auth");
              }
            }}
          >
            Login
          </Button>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[90vh] w-full px-4 md:px-16 py-16 md:gap-20 bg-transparent overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Modern blurred gradient background */}
        <div
          className="absolute -top-32 -left-32 w-[1000px] h-[900px] rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-purple-200 opacity-20 blur-3xl pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full md:w-1/2 flex flex-col items-start justify-center text-left space-y-6 z-10"
        >
          <div className="mb-4">
            <svg
              width="180"
              height="40"
              viewBox="0 0 180 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect
                  x="10"
                  y="15"
                  width="8"
                  height="10"
                  rx="4"
                  fill="#2563eb"
                >
                  <animate
                    attributeName="height"
                    values="10;30;10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="15;5;15"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="30"
                  y="10"
                  width="8"
                  height="20"
                  rx="4"
                  fill="#2563eb"
                  opacity="0.7"
                >
                  <animate
                    attributeName="height"
                    values="20;8;20"
                    dur="1s"
                    begin="0.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="10;16;10"
                    dur="1s"
                    begin="0.2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="50"
                  y="5"
                  width="8"
                  height="30"
                  rx="4"
                  fill="#2563eb"
                  opacity="0.5"
                >
                  <animate
                    attributeName="height"
                    values="30;10;30"
                    dur="1s"
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="5;15;5"
                    dur="1s"
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="70"
                  y="10"
                  width="8"
                  height="20"
                  rx="4"
                  fill="#2563eb"
                  opacity="0.7"
                >
                  <animate
                    attributeName="height"
                    values="20;32;20"
                    dur="1s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="10;4;10"
                    dur="1s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="90"
                  y="15"
                  width="8"
                  height="10"
                  rx="4"
                  fill="#2563eb"
                >
                  <animate
                    attributeName="height"
                    values="10;30;10"
                    dur="1s"
                    begin="0.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="15;5;15"
                    dur="1s"
                    begin="0.8s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="110"
                  y="10"
                  width="8"
                  height="20"
                  rx="4"
                  fill="#2563eb"
                  opacity="0.7"
                >
                  <animate
                    attributeName="height"
                    values="20;8;20"
                    dur="1s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="10;16;10"
                    dur="1s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="130"
                  y="5"
                  width="8"
                  height="30"
                  rx="4"
                  fill="#2563eb"
                  opacity="0.5"
                >
                  <animate
                    attributeName="height"
                    values="30;10;30"
                    dur="1s"
                    begin="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="5;15;5"
                    dur="1s"
                    begin="1.2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="150"
                  y="10"
                  width="8"
                  height="20"
                  rx="4"
                  fill="#2563eb"
                  opacity="0.7"
                >
                  <animate
                    attributeName="height"
                    values="20;32;20"
                    dur="1s"
                    begin="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="10;4;10"
                    dur="1s"
                    begin="1.4s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
            AI-Powered{" "}
            <span className="text-blue-600 relative">
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
            <br className="hidden md:block" />
            for Modern Recruiters
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
          </p>
          <Button className="bg-gradient-to-r from-blue-500 via-blue-300 to-purple-300 text-white px-16 py-4 font-semibold text-lg rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-500 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-150 flex items-center gap-2">
            Create Interview
            <ArrowRight size={20} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Right: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0 z-10"
        >
          <Image
            src="/landingpage1.png"
            alt="AI Interview Agent"
            width={500}
            height={400}
            className="w-full max-w-3xl h-auto object-contain rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-105"
            priority
          />
        </motion.div>
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
