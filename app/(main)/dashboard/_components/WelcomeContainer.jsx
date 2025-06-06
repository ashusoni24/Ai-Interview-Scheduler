'use client';
import { useUser } from '@/app/Provider'
import Image from 'next/image';
import { Sparkles } from "lucide-react";
import React from 'react'


function WelcomeContainer() {
  const { user } = useUser();
  return (
    <div className="w-full bg-gradient-to-r bg-blue-50 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between ">
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-2">
          <Sparkles size={28} />
        </span>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Welcome Back{user?.name ? `, ${user.name}` : "!"}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            AI-Driven Interviews, Hassle-Free Hiring
          </p>
        </div>
      </div>
      {user && (
        <Image
          src={user?.picture}
          alt="userAvatar"
          width={56}
          height={56}
          className="rounded-full shadow-lg border-2 border-white mt-4 md:mt-0"
        />
      )}
    </div>
  )
}

export default WelcomeContainer