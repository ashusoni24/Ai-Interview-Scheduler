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

function CandidateFeedbackDialog({ candidate }) {
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
        <Button variant="outline" className="text-primary">View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Candidate Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-4 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="bg-primary text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow">
                  {candidate.userName?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <div className="font-bold text-lg">{candidate?.userName}</div>
                  <div className="text-gray-500 text-sm">{candidate?.userEmail}</div>
                </div>
                <div className="ml-auto text-center">
                  <div className="text-primary text-3xl font-bold">{overallScore}/10</div>
                  <div className="text-xs text-gray-400">Overall Score</div>
                </div>
              </div>
              {/* Skills Assessment */}
              <div>
                <h2 className="font-bold mb-2">Skills Assessment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Technical Skills</span>
                      <span>{ratings?.technicalSkills}/10</span>
                    </div>
                    <Progress value={ratings?.technicalSkills * 10} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Communication</span>
                      <span>{ratings?.communication}/10</span>
                    </div>
                    <Progress value={ratings?.communication * 10} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Problem Solving</span>
                      <span>{ratings?.problemSolving}/10</span>
                    </div>
                    <Progress value={ratings?.problemSolving * 10} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Experience</span>
                      <span>{ratings?.experience}/10</span>
                    </div>
                    <Progress value={ratings?.experience * 10} className="mt-1" />
                  </div>
                </div>
              </div>
              {/* Performance Summary */}
              <div>
                <h2 className="font-bold mb-2">Performance Summary</h2>
                <div className="p-4 bg-gray-50 rounded-lg text-sm">
                  <p>{feedback?.summary || "No summary available."}</p>
                </div>
              </div>
              {/* Recommendation */}
              <div className={`p-4 flex flex-col sm:flex-row items-center justify-between rounded-lg ${feedback.Recommendation === 'No' ? 'bg-red-50' : 'bg-green-50'}`}>
                <div>
                  <h2 className={`font-bold ${feedback.Recommendation === 'No' ? 'text-red-700' : 'text-green-700'}`}>Recommendation:</h2>
                  <p className={`mt-1 text-sm ${feedback.Recommendation === 'No' ? 'text-red-600' : 'text-green-600'}`}>
                    {feedback?.RecommendationMsg}
                  </p>
                </div>
                <Button
                  className={`mt-4 sm:mt-0 ${feedback.Recommendation === 'No' ? 'bg-red-700 hover:bg-red-800' : 'bg-green-700 hover:bg-green-800'}`}
                >
                  Send Msg
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog