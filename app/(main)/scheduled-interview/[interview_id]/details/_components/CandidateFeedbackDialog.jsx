import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Progress } from '@/components/ui/progress'



function CandidateFeedbackDialog({candidate}) {

    const feedback = candidate?.feedback?.feedback;
     const ratings = feedback?.rating;
    const ratingValues = [
      ratings?.technicalSkills,
      ratings?.communication,
      ratings?.problemSolving,
      ratings?.experience,
    ].filter(v => typeof v === 'number');
    const overallScore = ratingValues.length
      ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
      : "N/A";

  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="text-primary">View Report</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>FeedBack</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-5 '>
            <div className='flex justify-between items-center'>
             <div className='flex items-center gap-5'>
                <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]|| "N/A"}</h2> 
                <div>
                    <h2 className='font-bold'>{candidate?.userName}</h2>
                    <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                </div>
                </div>
                <div className='flex gap-3 items-center'>
                <h2 className='text-primary text-2xl font-bold'>{overallScore}/10</h2>
               
                </div>
             </div>
             <div className='mt-5'>
                <h2 className='font-bold'>SKills Assesment</h2>
                <div className='mt-3 grid grid-cols-2 gap-5'>
                    <div>
                        <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                        <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                    </div>
                    <div>
                        <h2 className='flex justify-between'>Communication <span>{feedback?.rating?.communication}/10</span></h2>
                        <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                    </div>
                     <div>
                        <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                        <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                    </div>
                     <div>
                        <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience}/10</span></h2>
                        <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                    </div>
                </div>
             </div>
             <div className='mt-5'>
            <h2 className='font-bold'>Performance Summary</h2>
            <div className='p-5 bg-secondary mt-1 rounded-md'>
                {Array.isArray(feedback?.summery) ? (
                feedback.summery.map((summery, index) => (
                <p key={index}>{summery}</p>
                ))
            ) : (
                <p>{feedback?.summery || "No summary available."}</p>
            )}
            </div>
          
          </div>
          <div className={`p-5 flex items-center justify-between rounded-md mt-3  ${feedback.Recommendation=='Not Recommended'?'bg-red-100':'bg-green-100' }`}>
            <div>
                <h2 className={`font-bold ${feedback.Recommendation=='Not Recommended'?'text-red-700':'text-green-700' }`}>Recommendation Msg:</h2>
                <p className= {`mt-1 ${feedback.Recommendation=='Not Recommended'?'text-red-600':'text-green-600' }`} >{feedback?.RecommendationMsg}</p>
            </div>
            <Button className={`${feedback.Recommendation=='Not Recommended'?'bg-red-700':'bg-green-700' }`}>Send Msg</Button>
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default CandidateFeedbackDialog