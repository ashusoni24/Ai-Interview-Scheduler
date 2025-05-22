import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function QuestionList({ formData }) {

  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionlist] = useState();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      });

      console.log(result.data.content);
      const Content = result.data.content;

      // Use regex to cleanly extract JSON from ```json blocks
      const match = Content.match(/```json\s*([\s\S]*?)\s*```/);
      const FINAL_CONTENT = match ? match[1] : Content;

      const parsed = JSON.parse(FINAL_CONTENT);
      const questions = parsed.interviewQuestions || parsed;

      setQuestionlist(questions);
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast('Server Error, Try Again!');
      setLoading(false);
    }
  }
  const onFinish =()=>{

  }
  return (
    <div>
      {loading &&
        <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
          <Loader2Icon className='animate-spin' />
          <div>
            <h2>Generating Interview Questions</h2>
            <p>Our AI is crafting personalized questions bases on your job position</p>
          </div>
        </div>
      }

      {questionList?.length > 0 &&
      <div>
        <h2 className='font-bold text-lg mb-5'>Generated Interview Questions</h2>
        <div className='p-5 border border-gray-300 rounded-xl  mt-4 space-y-3'>
          {questionList.map((item, index) => (
            <div key={index} className='p-3 border border-gray-200 rounded-xl  mb-3'>
              <h2 className='font-bold '>Q{index + 1}: {item.question}</h2>
              <h2 className='text-sm text-primary'>Type: {item?.type || 'N/A'}</h2>
            </div>
          ))}
        </div>
        </div>
      }
      <div className='flex justify-end mt-10'>
        <Button onClick ={()=>onFinish()}>Finish</Button>
      </div>
    </div>
  )
}

export default QuestionList;






//this is before me adding the button at the last timestamp : 2:20 something
//night time : 8:39
/** import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function QuestionList({formData}) {


    const[loading, setLoading] = useState(true);
    const [questionList,setQuestionlist] = useState();
    useEffect(()=>{
        if(formData){
            GenerateQuestionList();
        }
    },[formData])

    const GenerateQuestionList =async()=>{
      setLoading(true);
      try{
       const result = await axios.post('/api/ai-model',{
        ...formData
       })
       console.log(result.data.content);
       const Content = result.data.content;
       const FINAL_CONTENT = Content.replace('"```json','').replace('```','')
       setQuestionlist(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
       setLoading(false);
      } catch (e){
        console.log(e);
        toast('Server Error, Try Again!')  
        setLoading(false);
      }
    }
  return (
    <div>
      {loading&&
      <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
        <Loader2Icon className='animate-spin'/>
        <div>
          <h2>Generating Interview Questions</h2>
          <p>Our AI is crafting personalized questions bases on your job position</p>
        </div>
      
        </div>}
        {questionList?.length>0 &&
        <div className='p-5 border border-gray-300 rounded-xl'>
          {questionList.map((item,index)=>(
            <div key={index} className='p-3 border border-gray-200 rounded-xl'>
              <h2 className='font-medium'>{item.question}</h2>
              <h2>Type: {item?.type}</h2>
            </div>
          ))}
          </div>}
    </div>
  )
}

export default QuestionList */