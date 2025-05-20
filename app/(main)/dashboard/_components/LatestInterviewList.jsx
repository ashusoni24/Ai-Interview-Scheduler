'use client';
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';
import React, { useState } from 'react'

function LatestInterviewList() {
    const [interviewList,setInterviewList] = useState([]);
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'> Priviously Created Interviews</h2>
       {interviewList?.length==0 && 
       <div className='p-5 flex flex-col gap-3 items-center bg-blue-50 mt-5'>
            <Video className='h-10 w-10 text-primary'/> 
            <h2>You dont have any interview created!</h2>
            <Button>+ Create New Interview</Button>  
        </div>}
    </div>
  )
}

export default LatestInterviewList