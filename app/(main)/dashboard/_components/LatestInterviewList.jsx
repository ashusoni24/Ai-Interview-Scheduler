'use client';
import InterviewCard from './interviewcard';import { Button } from '@/components/ui/button';
import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabseClient';
import { Camera, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function LatestInterviewList() {
    const [interviewList,setInterviewList] = useState([]);
    const {user} = useUser();

    useEffect(()=>{
      user && GetInterviewList();
    },[user])

    const GetInterviewList = async()=>
    {
  let { data: Interviews, error } = await supabase
  .from('Interviews')
  .select('jobPosition,duration,interview_id,created_at,interview-feedback(userEmail)')
  //changed all data fetch to specific data fetch
  .eq('userEmail',user?.email)
  .order('id',{ascending:false})
  .limit(6)

  console.log(Interviews);
  setInterviewList(Interviews);

    }
    

  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'> Priviously Created Interviews</h2>
       {interviewList?.length==0 && 
       <div className='p-5 flex flex-col gap-3 items-center bg-blue-50 mt-5'>
            <Video className='h-10 w-10 text-primary'/> 
            <h2>You dont have any interview created!</h2>
            <Button>+ Create New Interview</Button>  
        </div>}
        {interviewList&&
        <div className='grid grid-col-2 mt-5 xl:grid-cols-3 gap-5'>
          {interviewList.map((interview,index)=>(
              <InterviewCard interview={interview} key= {index}/>
          ))}
          </div>}
    </div>
  )
}

export default LatestInterviewList