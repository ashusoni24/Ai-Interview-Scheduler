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

    <div className='mt-16 flex justify-center px-4'>
         <div className='w-full max-w-2xl flex flex-col items-center justify-center border rounded-2xl bg-white p-9 mb-20'>
            <Image src={'/logo.png'} alt='logo' width ={200} height={100}
        className='w-[140px]'/>
        <h2 className='mt-2'>
           AI-Powered Interview Platform
        </h2>
             <Image src={'/interview2.png'} alt='interview'
             width={500}
             height={500}
             className='w-[280px] my-4'/>

             <h2 className='font-bold text-xl '>{interviewData?.jobPosition}</h2>
             <h2 className='flex gap-2 items-center mt-2 text-gray-500'><Clock className='h-4 w-4'/>{interviewData?.duration}</h2>

             <div className='w-full '>
                <h2>Enter Your Full Name</h2>
                <Input placeholder='e.g. Ashutosh Soni' className='mt-2' onChange={(event)=>setUserName(event.target.value)}/>
             </div>

             <div className='w-full mt-3'>
                <h2>Enter Your Email Address</h2>
                <Input placeholder='e.g. ashusoni@gmail.com' className='mt-2' onChange={(event)=>setUserEmail(event.target.value)}/>
             </div>

              <div className='p-3 bg-blue-50 flex gap-4 rounded-lg mt-4'>
                <Info className='text-primary'/>
                <div>
                    <h2 className='font-bold'>Before you begin </h2>
                   <ul className=''>
                        <li className='text-sm text-primary'>- Test you microphone before</li>
                        <li className='text-sm text-primary'>- Ensure you have a stable connection</li>
                        <li className='text-sm text-primary'>- Find a quiet place for interview</li>
                        
                </ul>
             </div>

              </div>

              <Button className={'mt-5 w-full font-bold'}
              disabled ={loading||!username}
              onClick={()=>onJoinInterview()}><Video/> {loading && <Loader2Icon/>} Join Interview</Button>

         </div>      
    </div>
  )
}

export default Interview