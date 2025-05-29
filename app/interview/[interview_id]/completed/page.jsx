"use client";
import React, { useContext } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

function InterviewCompleted() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 mt-2">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col gap-6 items-center justify-center p-15 max-w-2xl w-full">
        {/* Check image at the top */}
        <Image
          src="/check.png"
          alt="Success"
          width={70}
          height={70}
          className="mb-2"
          priority
        />
        {/* Interview Completed heading */}
        <h2 className="font-bold text-3xl text-black tracking-tight text-center">
          Interview Completed
        </h2>
        {/* Single line thank you */}
        <p className="text-lg text-gray-700 text-center">
          Thank you for completing your interview
          {interviewInfo?.userName ? `, ${interviewInfo.userName}` : ""}!
        </p>
        {/* Large completed image */}
        <Image
          src="/completed.png"
          alt="Interview Completed"
          width={180}
          height={180}
          className="my-2 rounded-full object-cover shadow"
        />
        {/* What's next */}
        <h3 className="text-2xl font-bold text-black text-center mt-2">
          What's next???
        </h3>
        {/* Next steps message */}
        <p className="text-gray-600 text-center text-base">
          Our recruiter will review your interview and responses.
          <br />
          If you are shortlisted, you will be contacted for the next round.
          <br />
          Keep an eye on your email for updates!
        </p>
      </div>
    </div>
  );
}

export default InterviewCompleted;