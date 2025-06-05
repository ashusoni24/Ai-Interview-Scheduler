import React from 'react'
import moment from 'moment';
import { Button } from '@/components/ui/button';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ candidateList }) {
  if (!Array.isArray(candidateList) || candidateList.length === 0) {
    return (
      <div>
        <h2 className="font-bold my-5">Candidates (0)</h2>
        <p className="text-gray-400">No candidates yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-2xl my-6">FeedBacks ({candidateList.length}) : </h1>
      <div className="flex flex-col gap-4">
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
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-xl shadow p-5 border border-blue-100 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <span className="bg-blue-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow">
                  {candidate.userName?.[0]?.toUpperCase() || "?"}
                </span>
                <div>
                  <div className="font-semibold text-lg">{candidate?.userName}</div>
                  <div className="text-gray-400 text-sm">
                    Completed On: {moment(candidate.created_at).format('MMM DD, yyyy')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span className="text-green-600 font-semibold text-lg">{overallScore}/10</span>
                <CandidateFeedbackDialog candidate={candidate} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CandidateList;