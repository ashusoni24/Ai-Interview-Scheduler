"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BillingPlans from "@/app/(main)/billing/_components/BillingPlans";
import { Clock, BarChart2, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingPhrases = [
  "Interview Assistant",
  "Hiring Copilot",
  "Screening Bot",
  "Talent Scout",
  "AI Recruiter",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <main className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-6">
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
          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#howitworks" className="hover:text-blue-600 transition">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition">
            Pricing
          </a>
        </nav>
        
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-[90vh] w-full bg-gradient-to-b from-[#f8f9fb] via-white to-[#f8f9fb] overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <div className="z-10 flex flex-col items-center justify-center">
          {/* Animated Voice Waveform */}
          
          {/* End Voice Waveform */}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 flex flex-wrap justify-center">
            AI-Powered{" "}
            <span className="text-blue-600 mx-2 relative min-w-[210px] h-[56px] inline-flex items-center justify-center">
              Interview
            </span>
            for Modern Recruiters
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
          </p>
          <Button className="bg-blue-400 text-white px-8 py-3 text-base font-semibold rounded-lg shadow hover:bg-blue-700 transition">
            Create Interview
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-white py-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Streamline Your Hiring Process
          </h2>
          <p className="text-gray-500 mb-10 text-center max-w-2xl">
            AiCruitier helps you save time and find better candidates with our advanced AI interview technology.
          </p>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="bg-[#f8f9fb] border rounded-xl flex flex-col items-center p-8 flex-1 shadow-sm">
              <Clock className="text-blue-600 mb-3" size={36} />
              <h3 className="font-semibold text-lg mb-2">Save Time</h3>
              <p className="text-gray-500 text-center text-base">
                Automate initial screening interviews and focus on final
                candidates.
              </p>
            </div>
            <div className="bg-[#f8f9fb] border rounded-xl flex flex-col items-center p-8 flex-1 shadow-sm">
              <BarChart2 className="text-blue-600 mb-3" size={36} />
              <h3 className="font-semibold text-lg mb-2">Data-Driven Insights</h3>
              <p className="text-gray-500 text-center text-base">
                Get detailed analytics and candidate comparisons based on
                interview responses.
              </p>
            </div>
            <div className="bg-[#f8f9fb] border rounded-xl flex flex-col items-center p-8 flex-1 shadow-sm">
              <UserCheck className="text-blue-600 mb-3" size={36} />
              <h3 className="font-semibold text-lg mb-2">Reduce Bias</h3>
              <p className="text-gray-500 text-center text-base">
                Standardized interviews help eliminate unconscious bias in the
                hiring process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howitworks" className="w-full bg-[#f8f9fb] py-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            How AiCruitier Works
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
