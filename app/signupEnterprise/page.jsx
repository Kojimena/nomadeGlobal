import React from 'react'
import FormSignUpEnterprise from '@/components/FormSignUpEnterprise/FormSignUp'
import SocialMedia from '@/components/SocialMedia/SocialMedia'


const SignUpEnterprise = () => {
  return (
    <div className='flex h-[100vh] w-full flex-col items-center justify-center relative overflow-hidden'>
        <FormSignUpEnterprise />
          <SocialMedia />
    </div>
  )
}

export default SignUpEnterprise