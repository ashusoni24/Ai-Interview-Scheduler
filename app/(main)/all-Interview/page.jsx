"use client"
import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {InterviewCard} from '../dashboard/_components/InterviewCard';

function AllInterview() {
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
  .eq('userEmail',user?.email)
  .order('id',{ascending:false})

  console.log(Interviews);
  setInterviewList(Interviews);

    }

  return (
    <div className='my-0'>
        <h2 className='font-bold text-2xl'> All Priviously Created Interviews</h2>
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


export default AllInterview