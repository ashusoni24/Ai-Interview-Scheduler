"use client";
import React, { useContext } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

function InterviewCompleted() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-50 to-white relative overflow-hidden">
      {/* Optional: Abstract SVG shape for extra depth */}
      
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col gap-6 items-center justify-center p-10 max-w-lg w-full border border-blue-100">
        {/* Animated Check Icon */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-4 mb-2 shadow-lg animate-bounce">
          <CheckCircle2 size={48} className="text-white" />
        </div>
        {/* Interview Completed heading */}
        <h2 className="font-bold text-3xl text-gray-900 tracking-tight text-center font-sans">
          Interview Completed
        </h2>
        {/* Thank you */}
        <p className="text-lg text-gray-700 text-center font-sans">
          Thank you for completing your interview
          {interviewInfo?.userName ? `, ${interviewInfo.userName}` : ""}!
        </p>
        {/* Illustration */}
        <Image
          src="/completed.png"
          alt="Interview Completed"
          width={180}
          height={180}
          className="my-2 rounded-xl object-cover shadow"
        />
        {/* What's next */}
        <div className="w-full bg-blue-50 rounded-xl p-5 mt-2 text-center animate-fadeIn">
          <h3 className="text-xl font-bold text-blue-700 mb-2 font-sans">
            What’s next?
          </h3>
          <p className="text-gray-600 text-base">
            Our recruiter will review your interview and responses.
            <br />
            If you are shortlisted, you will be contacted for the next round.
            <br />
            <span className="font-medium text-blue-600">
              Keep an eye on your email for updates!
            </span>
          </p>
        </div>
        {/* Go to Dashboard Button */}
        
      </div>
    </div>
  );
}

export default InterviewCompleted;