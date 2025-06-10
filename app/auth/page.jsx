'use client';
import { supabase } from '@/services/supabseClient'
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from 'react'
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  /**
   * used to sign in with google
   */
  const signInWithOAuth = async() => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider:'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    });
    if(error){
      console.error('Error:' ,error.message)
    }else{
      router.push("/dashboard");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-50 to-purple-100 dark:from-[#18181b] dark:via-[#23232a] dark:to-[#18181b] transition-colors">
      <div className="absolute -z-10 w-[700px] h-[700px] bg-gradient-to-br from-blue-300 via-purple-200 to-blue-100 opacity-30 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center border rounded-2xl p-8 bg-white/70 dark:bg-[#23232a]/80 backdrop-blur-xl shadow-2xl"
      >
        <Image src="/logo8.png" alt="logo" width={180} height={150} className="w-[140px]" />
        <p className="text-blue-600 dark:text-blue-300 text-sm  mb-4 text-center font-medium">
          AI-powered hiring made easy
        </p>
        <div className="flex flex-col items-center w-full">
          <Image src="/login1.png" alt="login" width={400} height={250} className="w-[320px] h-[220px] mb-4" />
          <h2 className="text-2xl font-bold text-center mt-2">Welcome to AIcruiter</h2>
          <p className="text-gray-500 dark:text-gray-300 text-center mb-4">
            Sign in to schedule and manage your AI-powered interviews.
          </p>
          <Button
            className="mt-2 bg-gradient-to-r bg-blue-300 text-white px-8 py-3 font-semibold text-lg rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-500 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-150 flex items-center gap-3"
            onClick={signInWithOAuth}
          >
            <Image src="/googleicon1.webp" alt="Google" width={24} height={24} className="inline-block" />
            Login with Google
          </Button>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-blue-600"
              onClick={e => {
                e.preventDefault();
                alert(
                  `Terms of Service:\n\n- You agree to use this platform for lawful recruitment purposes only.\n- Your data may be processed to improve our services.\n- We do not share your personal information with third parties except as required by law.\n- By signing in, you accept these terms.`
                );
              }}
            >
              Terms
            </a>.
          </p>
          <a
            href="mailto:24ashusoni@gmail.com"
            className="text-xs text-blue-500 dark:text-blue-300 mt-2 hover:underline text-center"
          >
            Need help? Contact support
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Login