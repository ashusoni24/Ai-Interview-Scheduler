"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { supabase } from "@/services/supabseClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null); // <-- useRef for vapi instance
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [timer, setTimer] = useState(0);
  const timerInterval = useRef(null);

  // Initialize vapi only once
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    }
  }, []);

  useEffect(() => {
    interviewInfo && startcall();
    // eslint-disable-next-line
  }, [interviewInfo]);

  const startcall = () => {
    let questionList = "";
    if (Array.isArray(interviewInfo?.interviewData?.questionList)) {
      questionList = interviewInfo.interviewData.questionList
        .map((item) => item?.question)
        .filter(Boolean)
        .join(", ");
    }
    console.log(questionList);

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi" +
        interviewInfo?.userName +
        " how are you? Ready for your interview on" +
        interviewInfo?.interviewData?.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
  You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ` +
              questionList +
              `
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };
    vapiRef.current.start(assistantOptions);
  };

  const stopInterview = () => {
    vapiRef.current.stop(); // <-- use the persistent instance
    console.log("STOP...");
    if (timerInterval.current) clearInterval(timerInterval.current);
    GenerateFeedback();
  };

  useEffect(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    const handleMessage = (message) => {
      console.log("Message:", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("Conversation string:", convoString);
        setConversation(convoString);
      }
    };
    vapi.on("message", handleMessage);

    vapi.on("call-start", () => {
      console.log("Call has started.");
      toast("Call Connected...");
      // Start timer
      setTimer(0);
      if (timerInterval.current) clearInterval(timerInterval.current);
      timerInterval.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    });

    vapi.on("call-end", () => {
      console.log("Call has ended.");
      toast("Interview Ended.. Please wait..");
      // Stop timer
      if (timerInterval.current) clearInterval(timerInterval.current);
      GenerateFeedback();
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech had started.");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    });

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => console.log("END"));
      vapi.off("speech-start", () => console.log("END"));
      vapi.off("speech-end", () => console.log("END"));
      vapi.off("speech-end", () => console.log("END"));
      vapi.off("call-end", () => {
        alert("CALLED END CALLED");
        console.log("CALL END");
      });
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  const GenerateFeedback = async () => {
    setLoading(true);
    console.log("conversation", conversation);
    if (!conversation) {
      return;
    }
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });

    console.log(result?.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
    console.log(FINAL_CONTENT);

    // Parse feedback object
    let feedbackObj;
    try {
      feedbackObj = JSON.parse(FINAL_CONTENT);
    } catch (e) {
      feedbackObj = {};
    }

    // Extract recommendation (adapt this if your AI returns a boolean or "Yes"/"No")
    const recommended =
      feedbackObj?.feedback?.Recommendation?.toLowerCase?.() === "yes" ||
      feedbackObj?.feedback?.Recommendation === true;

    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: feedbackObj,
          recommended: recommended,
        },
      ])
      .select();
    console.log(data);
    router.replace("/interview/" + interview_id + "/completed");
    setLoading(false);
  };

  // Helper to format seconds to HH:MM:SS
  const formatTimer = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-15 px-2 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50">
<h2 className="font-bold text-xl flex justify-between w-full max-w-6xl mx-auto">
  AI Interview Session
  <span className="flex gap-2 items-center bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow font-mono text-lg font-semibold text-black">
    <Timer className="h-5 w-5 text-black" />
    <span className="tracking-widest">{formatTimer(timer)}</span>
  </span>
</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 w-full max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-2xl border flex flex-col gap-3 items-center justify-center h-[500px]">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
            )}
            <Image
              src={"/ai.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-2xl border flex flex-col gap-3 items-center justify-center h-[500px]">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
            )}
            <h2 className="text-2xl bg-primary text-white h-[50px] w-[50px] p-3 rounded-full px-5.5 flex items-center justify-center">
              {interviewInfo?.userName[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        {!loading ? (
          <Phone
            className="h-12 w-12 p-3 bg-red-400 text-white rounded-full cursor-pointer"
            onClick={() => stopInterview()}
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in progress...
      </h2>
    </div>
  );
}

export default StartInterview;
