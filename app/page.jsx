"use client";
import { useRouter } from "next/navigation"

import { BsBuildingsFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";


export default function Home() {

  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <img src="/images/logo_color.jpg" alt="logo" className="w-40 h-40"/>
      <h1 className="text-4xl font-bold font-Ourland text-darkBlue">Soy</h1>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-10 ">
          <button onClick={() => router.push('/signupEnterprise')} className="colCenter py-10 px-20 gap-4 text-white  bg-darkBlue rounded-md hover:bg-yellow hover:text-darkBlue">
            <BsBuildingsFill size={50}/>
            <p className="font-montserrat">Empresa</p>
          </button>
          <button onClick={() => router.push('/signupWorker')} className="colCenter py-10 px-20 gap-4 text-white  bg-darkBlue rounded-md hover:bg-yellow hover:text-darkBlue">
            <GrUserWorker size={50} />
            <p className="font-montserrat">Trabajador</p>
          </button>
      </div>
    </main>
  )
}