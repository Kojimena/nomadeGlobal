import React from 'react'
import FormSignUp from '@/components/FormSignUp/FormSignUp'
import SocialMedia from '@/components/SocialMedia/SocialMedia'


const SignUpWorker = () => {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center relative">
        <FormSignUp />
        <div className='absolute bottom-0'>
          <SocialMedia />
        </div>
    </div>
  )
}

export default SignUpWorker