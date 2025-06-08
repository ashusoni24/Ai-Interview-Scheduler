import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <header className="w-full flex justify-center items-center py-4 bg-blur backdrop-blur-md shadow-md border-b border-blue-100 sticky top-0 z-30">
      <Image
        src="/logo.png"
        alt="logo"
        width={120}
        height={40}
        className="w-[120px] h-auto"
        priority
      />
    </header>
  )
}

export default InterviewHeader