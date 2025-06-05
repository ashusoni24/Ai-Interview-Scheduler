import React from 'react'
import { Calendar, Clock, MessageCircleQuestionIcon } from 'lucide-react'
import moment from 'moment';

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className='mt-7'>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-1">
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 rounded-full p-2">
            <Clock className="h-5 w-5" />
          </span>
          <div>
            <div className="text-xs text-gray-500">Duration</div>
            <div className="font-semibold">{interviewDetail?.duration}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-600 rounded-full p-2">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <div className="text-xs text-gray-500">Created On</div>
            <div className="font-semibold">{moment(interviewDetail?.created_at).format('MMM DD, yyyy')}</div>
          </div>
        </div>
        {interviewDetail?.type && (
          <div className="flex items-center gap-3">
            <span className="bg-purple-100 text-purple-600 rounded-full p-2">
              <MessageCircleQuestionIcon className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs text-gray-500">Type</div>
              <div className="font-semibold">{JSON.parse(interviewDetail?.type)}</div>
            </div>
          </div>
        )}
      </div>
      <hr className="my-4" />
      <div className="mb-2">
        <h3 className="font-bold text-lg mb-1">Job Position: </h3>
        <div className="text-gray-800 text-base mb-2">{interviewDetail?.jobPosition}</div>
        <h3 className="font-bold text-lg mb-1">Job Description:</h3>
        <p className="text-gray-700 text-sm leading-6 ">{interviewDetail?.jobDescription}</p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Interview Questions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviewDetail?.questionList?.map((item, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-3 text-sm flex items-start gap-2">
              <span className="font-bold text-blue-600">{index + 1}.</span>
              <span>{item?.question}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterviewDetailContainer