'use client';
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabseClient'
import Image from 'next/image'
import React from 'react'

function Login() {
  /**
   * used to sign in with google
   */
  const signInWithOAuth = async() => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider:'google'
    });
    if(error){
      console.error('Error:' ,error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image src={'/logo.png'} alt='logo' 
        width={200} 
        height={150}
        className='w-[170px]'
        ></Image>
      
      <div className='flex flex-col '>
        <Image src={'/login.png'} alt='login'
         width={600}
          height={400}
          className='w-[400px] h-[250px]'></Image>
          <h2 className='text-2xl font-bold text-center mt-2'>Welcome to AICruiter</h2>
          <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
          <Button className='mt-4'
          onClick={signInWithOAuth}>Login with Google</Button>
          </div>
      </div>
    </div>
  )
}

export default Login