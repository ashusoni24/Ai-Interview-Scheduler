import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
        <Link href={'/dashboard/create-interview'} className=' border border-gray-200 bg-blue-50 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
        >
          <Video className='p-3 text-primary bg-gray-50  rounded-lg h-12
          w-12 border'></Video>
          <h2 className='font-bold'>Create New Interview</h2>
          <p className='text-gray-500'>Create AI Interview and Schedule them with Candidates</p>
        </Link>
        <div className=' border border-gray-200 bg-blue-50 rounded-lg p-5 flex flex-col gap-2'>
          <Phone className='p-3 text-primary bg-gray-50  rounded-lg h-12
          w-12 border'></Phone>
          <h2 className='font-bold'>Create Phone Screeing Call</h2>
          <p className='text-gray-500'>Scheule Phone Screening Call with Candidates</p>
        </div>
    </div>
  )
}

export default CreateOptions