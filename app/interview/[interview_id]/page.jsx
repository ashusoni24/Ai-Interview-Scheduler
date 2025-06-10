'use client';
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabseClient';
import { toast } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';


function Interview() {

   const {interview_id}= useParams();
   console.log(interview_id)
   
   const[interviewData,setInterviewData]=useState();
   const[username,setUserName]=useState();
   const[userEmail,setUserEmail] = useState();
   const[loading,setLoading]= useState(false);
   const{interviewInfo,setInterviewInfo} =useContext(InterviewDataContext);
   const router = useRouter();


    useEffect(()=>{
    interview_id && GetInterviewDetails();
    },[interview_id])

   const GetInterviewDetails =async()=>{
    setLoading(true);
    try{
    let { data:Interviews, error } = await supabase
  .from('Interviews')
  .select("jobPosition,jobDescription,duration,type")
  .eq('interview_id',interview_id)
   setInterviewData(Interviews[0]);
   setLoading(false);
   if(Interviews?.length==0){
    toast('Incorrect Interview Link')
    return ;
   }
   
    }
    catch(e){
        setLoading(false);
        touch('Incorrect Interview Link')
    }

       }

       const onJoinInterview=async()=>{
         setLoading(true);
         let { data: Interviews, error } = await supabase
         .from('Interviews')
         .select('*')
         .eq('interview_id',interview_id);
         console.log(Interviews[0]);
         setInterviewInfo({
            userName:username,
            userEmail:userEmail,
            interviewData:Interviews[0]
            
         });
         router.push('/interview/'+ interview_id +'/start')
         setLoading(false);

       }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 py-8 px-2">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center border rounded-2xl bg-white/80 backdrop-blur-lg p-6 mb-10 shadow-2xl">
        <h2 className='mt-2 text-2xl font-extrabold text-slate-800'>
          AI-Powered Interview Platform
        </h2>
        <Image src={'/interview2.png'} alt='interview'
          width={500}
          height={500}
          className='w-[280px] my-4'
        />

        <h2 className='font-bold text-xl text-black'>{interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center mt-2 text-gray-500 font-mono'>
          <Clock className='h-4 w-4 text-blue-500'/>
          {interviewData?.duration}
        </h2>

        <div className='w-full mt-4'>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Enter Your Full Name</h2>
          <Input
            placeholder='e.g. Ashutosh Soni'
            className='mt-2 bg-white/90 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition'
            onChange={(event)=>setUserName(event.target.value)}
          />
        </div>

        <div className='w-full mt-3'>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Enter Your Email Address</h2>
          <Input
            placeholder='e.g. ashusoni@gmail.com'
            className='mt-2 bg-white/90 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition'
            onChange={(event)=>setUserEmail(event.target.value)}
          />
        </div>

        <div className='p-3 bg-blue-50/80 border-l-4 border-blue-400 flex gap-4 rounded-lg mt-4 w-full'>
          <Info className='text-blue-500 mt-1'/>
          <div>
            <h2 className='font-bold text-blue-700 mb-1'>Before you begin</h2>
            <ul>
              <li className='text-sm text-blue-700'>- Test your microphone before</li>
              <li className='text-sm text-blue-700'>- Ensure you have a stable connection</li>
              <li className='text-sm text-blue-700'>- Find a quiet place for interview</li>
            </ul>
          </div>
        </div>

        <Button
          className='mt-5 w-full font-bold text-lg py-3 rounded-xl bg-gradient-to-r bg-blue-400 hover:scale-105 transition-all flex items-center justify-center gap-2'
          disabled={loading||!username}
          onClick={()=>onJoinInterview()}
        >
          <Video className="mr-2" />
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Join Interview
        </Button>
      </div>
    </div>
  )
}

export default Interview