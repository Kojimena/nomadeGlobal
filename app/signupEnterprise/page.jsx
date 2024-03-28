import React from 'react'
import FormSignUpEnterprise from '@/components/FormSignUpEnterprise/FormSignUp'
import SocialMedia from '@/components/SocialMedia/SocialMedia'


const SignUpEnterprise = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center relative'>
        <FormSignUpEnterprise />
        <div className='absolute bottom-0'>
          <SocialMedia />
        </div>
    </div>
  )
}

export default SignUpEnterprise