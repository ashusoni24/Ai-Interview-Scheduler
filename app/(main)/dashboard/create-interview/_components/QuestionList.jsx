import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabseClient';
import { useUser } from '@/app/Provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData }) {

  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionlist] = useState();
  const {user} = useUser();
  const [saveLoading ,setSaveLoading] = useState(false);

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
  const onFinish =async()=>{
    setSaveLoading(true);
    const interview_id = uuidv4();
        const { data, error } = await supabase
  .from('Interviews')
  .insert([
    { 
      ...formData,
      questionList:questionList,
      userEmail:user?.email,
      interview_id:interview_id
     },
  ])
  .select()
  setSaveLoading(false);
  
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
        <QuestionListContainer questionList={questionList}/>
        </div>
      }
      <div className='flex justify-end mt-10'>
        <Button onClick ={()=>onFinish()} disabled = {saveLoading}>
          {saveLoading && <Loader2 className='animate-spin'/>}
          Finish</Button>
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