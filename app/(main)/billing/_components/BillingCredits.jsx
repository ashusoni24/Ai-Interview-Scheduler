"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabseClient";
import { CreditCard } from "lucide-react";
import { useUser } from "@/app/Provider"; // or your auth provider


export default function BillingCredits() {
  const [credits, setCredits] = useState(0);
  const { user } = useUser(); // get user object

  useEffect(() => {
    async function fetchCredits() {
      if (!user?.id) return; // wait for user to load
      const { data, error } = await supabase
        .from('Users') // Capital U
        .select('credits')
        .eq('id', Number(user.id))
        .single();
        console.log("Supabase data:", data, "error:", error);
      if (data) setCredits(data.credits);
    }
    fetchCredits();
  }, [user]);

  console.log("user.id:", user?.id, typeof user?.id);

  return (
    <div className="bg-blue-50 rounded-xl shadow p-6 flex-1 max-w-md flex flex-col items-center justify-center">
      <h3 className="font-semibold mb-2 text-center">Your Credits</h3>
      <p className="text-gray-500 mb-4 text-sm text-center">Current usage and remaining credits</p>
      <div className="flex flex-row items-center justify-center gap-2 mb-4 bg-white p-4 w-full rounded-xl">
        <CreditCard className="text-blue-600" />
        <span className="text-blue-600 font-bold text-xl">{credits} interviews left</span>
      </div>
    </div>
  );
}