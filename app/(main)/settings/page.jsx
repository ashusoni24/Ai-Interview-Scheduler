'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabseClient";
import { useUser } from "@/app/Provider";
import Image from "next/image";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f8f9fb] dark:bg-[#18181b]">
      <div className="bg-white dark:bg-[#23232a] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center border border-blue-100">
        {user?.picture && (
          <Image
            src={user.picture}
            alt={user.name || "User"}
            width={72}
            height={72}
            className="rounded-full shadow mb-4"
          />
        )}
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
          {user?.name || "Settings"}
        </h2>
        <p className="text-gray-500 mb-2">{user?.email}</p>
        <hr className="w-full border-t border-blue-100 my-4" />
        <div className="w-full flex flex-col gap-4">
          {/* Add more settings here as needed */}
          
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow transition"
            onClick={handleLogout}
          >
            Logout
          </Button>
          
        </div>
      </div>
    </div>
  );
}