import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Copy, CopyCheck, CopyIcon, Link2, List, Mail, Plus } from 'lucide-react'
import Link from 'next/link'; 


function InterviewLink({interview_id,formData}) {
const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
const GetInterviewUrl = ()=>{
  return url;
}

const onCopyLink = async()=>{
    await navigator.clipboard.writeText(url);
    toast('Link Copied')
}

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Image src={'/check.png'} alt='check'
        width={200}
        height={200}
        className='w-[50px] h-[50px]'/>
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready</h2>
        <p className='mt-3'>Share this link with your Candidated to start the interview process</p>

        {/* Interview Link Section */}
        <div className="w-full p-6 mt-6 rounded-2xl bg-white shadow border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-base">Interview Link</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              Valid for 30 Days
            </span>
          </div>
          <div className="flex gap-2 items-center mb-4">
            <Input
              value={GetInterviewUrl()}
              disabled
              className="bg-blue-50 border-2 text-sm"
            />
            <Button
              onClick={onCopyLink}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow hover:scale-105 transition"
            >
              <Copy className="w-4 h-4 mr-1" /> Copy Link
            </Button>
          </div>
          <div className="flex gap-5">
            <span className="text-sm flex gap-2 items-center text-gray-600">
              <Clock className="h-4 w-4" /> {formData?.duration}
            </span>
            <span className="text-sm flex gap-2 items-center text-gray-600">
              <List className="h-4 w-4" /> 10 Questions
            </span>
          </div>
        </div>

        {/* Share Via Section */}
        <div className="mt-7 bg-blue-50/70 p-6 rounded-2xl w-full shadow border border-blue-100">
          <h2 className="font-bold mb-3">Share Via</h2>
          <div className="flex gap-4 flex-wrap">
            {/* Email */}
            <a
              href={`mailto:24ashusoni@gmail.com?subject=AI Interview Link&body=Hi,%0A%0APlease use this link to start your interview:%0A${encodeURIComponent(GetInterviewUrl())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-full px-5 py-2 flex items-center gap-2 hover:border-blue-500 transition cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
            {/* Slack */}
            <a
              href="https://slack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-full px-5 py-2 flex items-center gap-2 hover:border-blue-500 transition cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Slack
            </a>
            {/* WhatsApp */}
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-full px-5 py-2 flex items-center gap-2 hover:border-blue-500 transition cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Whatsapp
            </a>
          </div>
        </div>
        <div className='flex w-full gap-5 justify-between mt-6'>
          <Link href='/dashboard'>
          <Button variant ={'outline'} ><ArrowLeft/>Back to dashboard</Button>
          </Link>
          <Link href='/create-interview'>
          <Button ><Plus/>Create New Interview</Button>
          </Link>
        </div>
    </div>
  )
}

export default InterviewLink