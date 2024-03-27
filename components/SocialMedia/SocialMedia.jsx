import React from 'react'
import { AiFillInstagram } from "react-icons/ai"
import { AiFillFacebook } from "react-icons/ai"
import { AiFillLinkedin } from 'react-icons/ai'

const SocialMedia = () => {
  return (
    <div className="flex justify-center items-center">
        <a href="https://www.instagram.com/nomadeglobaltalent?igsh=MTYwYjl4cGJkYml4cg==">
            <AiFillInstagram className="text-4xl text-yellow m-4 hover:text-white" />
        </a>
        <a href="https://www.facebook.com/share/YvVNwDjMKZdcBbDJ/?mibextid=qi2Omg">
            <AiFillFacebook className="text-4xl text-yellow m-4 hover:text-white" />
        </a>
        <a href="https://www.linkedin.com/company/nomade-globaltalent/">
            <AiFillLinkedin className="text-4xl text-yellow m-4 hover:text-white" />
        </a>
    </div>
  )
}

export default SocialMedia