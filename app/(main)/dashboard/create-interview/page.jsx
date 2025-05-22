'use client';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink';


function CreateInterview() {
    const router = useRouter();
    const [step,setStep] = useState(1);
    const [ formData , setFormData] = useState();
    const[interviewId,setInterviewid] = useState();
    const onHandleInputChange = (field , value) =>{
           setFormData(prev => ({
            ...prev,
            [field] : value
           }))
           console.log("formdata",formData)
    }

    const onGoToNext=()=>{
      if(!formData?.jobPosition||!formData?.jobDescription||!formData?.duration||!formData?.type){
        toast("Please Enter All Details! ")
        return ;
      }
      setStep(step+1);
    }
    const onCreateLink =(interview_id)=>{
          setInterviewid(interview_id);
          setStep(step+1); 
    }
  return (
    <div className='mt-3 px-10 md:px-24 lg:px-44 xl:pd-56'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
            <h2 className='font-bold text-2xl'>Create New Interview</h2>
            
        </div>
      <Progress value={step*33.33} className='my-5' />
      {step==1? <FormContainer onHandleInputChange={onHandleInputChange}
      GoToNext={()=>onGoToNext() }/>
      :step ==2?<QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>
      :step==3?<InterviewLink interview_id={interviewId}
      formData ={formData}
      />:null
    }
    </div>
  )
}

export default CreateInterview