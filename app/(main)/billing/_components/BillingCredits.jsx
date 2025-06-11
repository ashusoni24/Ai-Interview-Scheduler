"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabseClient";
import { CreditCard } from "lucide-react";
import { useUser } from "@/app/Provider";


export default function BillingCredits() {
  const [credits, setCredits] = useState(0);
  const { user } = useUser();


  useEffect(() => {
    async function fetchCredits() {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('Users')
        .select('credits')
        .eq('id', user.id) // Remove Number() if your id is a string (UUID)
        .single();
      if (data) setCredits(data.credits);
      if (error) console.error("Supabase error:", error);
    }
    fetchCredits();
  }, [user]);

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-10 flex-1 min-h-[340px] flex flex-col items-center justify-center max-w-2xl w-full">
      <h3 className="font-semibold mb-2 text-2xl text-center">Your Interview Credits</h3>
      <p className="text-gray-600 mb-4 text-base text-center">
        Track your available interview credits and usage. <br />
      </p>
      <div className="flex flex-row items-center justify-center gap-4 mb-6 bg-white p-6 w-full rounded-xl shadow">
        <CreditCard className="text-black" size={36} />
        <span className="text-black font-extrabold text-3xl">{credits} interviews left</span>
      </div>
      <ul className="text-gray-500 text-sm space-y-1 text-center">
        <li>• Each interview session deducts one credit.</li>
        <li>• Purchase more credits for hiring process seamless.</li>
        <li>• Credits never expire.</li>
      </ul>
    </div>
  );
}