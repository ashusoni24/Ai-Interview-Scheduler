import React from 'react'
import moment from 'moment/moment';
import { Button } from '@/components/ui/button';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({candidateList}) {


    if (!Array.isArray(candidateList) || candidateList.length === 0) {
    return (
      <div>
        <h2 className='font-bold my-5'>Candidates(0)</h2>
        <p className="text-gray-500">No candidates yet.</p>
      </div>
    );
  }

  

  return (
    <div className=''>
        <h2 className='font-bold my-5'>Candidates({candidateList?.length})</h2>
         {candidateList.map((candidate, index) => {
  // Calculate overall score
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
    <div key={index} className='p-5 flex gap-3 items-center justify-between bg-blue-50 rounded-lg border mb-2'>
      <div className='flex items-center gap-5'>
        <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]|| "N/A"}</h2> 
        <div>
          <h2 className='font-bold'>{candidate?.userName}</h2>
          <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate.created_at).format('MMM DD,yyyy')}</h2>
        </div>
      </div>
      <div className='flex gap-3 items-center'>
        <h2 className='text-green-700'>{overallScore}/10</h2>
        <CandidateFeedbackDialog candidate={candidate}/>
      </div>
    </div>
  );
})}
    </div>
  )
}

export default CandidateList