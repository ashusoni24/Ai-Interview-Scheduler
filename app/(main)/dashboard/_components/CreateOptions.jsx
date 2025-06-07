import { CreditCard, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateOptions() {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-2xl transition group border border-blue-100">
        <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
          <CreditCard size={28} />
        </div>
        <h3 className="font-bold text-lg mb-1">Create New Interview</h3>
        <p className="text-gray-500 mb-4">
          Create AI Interview and schedule them with candidates.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r bg-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow group-hover:scale-105 transition"
        >
          <Link href="/dashboard/create-interview">Create Interview</Link>
        </Button>
      </div>
      <div className="relative flex-1 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-2xl transition group border border-blue-100">
        {/* Coming Soon Badge */}
        <span className="absolute top-4 right-4 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10 animate-pulse">
          Coming Soon
        </span>
        <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
          <Phone size={28} />
        </div>
        <h3 className="font-bold text-lg mb-1">Create Phone Screening Call</h3>
        <p className="text-gray-500 mb-4">
          Schedule phone screening calls with candidates.
        </p>
        <Button
          disabled
          className="bg-gradient-to-r bg-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow opacity-60 cursor-not-allowed"
        >
          Coming Soon
        </Button>
      </div>
    </div>
  );
}