import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({interview}) {
const url = process.env.NEXT_PUBLIC_HOST_URL+"/"+ interview?.interview_id
   const copyLink=()=>{
             
             navigator.clipboard.writeText(url);
             toast('Copied')
       }

  const onSend =()=>{
       window.location.href="mailto:24ashusoni@gmail.com?subject=Aicruiter Interview Link & body = Interview Link: "+url
  }

  return (
    <div className='p-5 bg-blue-50 rounded-lg border mt-2'>
        <div className='flex items-center justify-between'>
            <h2 className='mt-3 font-bold text-lg'> {interview?.jobPosition}</h2>
            <h2 className='text-sm'>{moment(  interview?.created_at).format('DD MMM yyy')}</h2>
            
        </div>
       
        <h2 className='mt-1'>{interview.duration}</h2>
        <div className="flex gap-3 w-full mt-5">
          <Button variant="outline" className="flex-1" onClick={copyLink}>
            <Copy /> Copy Link
          </Button>
          <Button className="flex-1" onClick={onSend}>
            <Send /> Send
          </Button>
        </div>
    </div>
  )
}

export default InterviewCard