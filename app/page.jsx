"use client";
import { useRouter } from "next/navigation"

import { BsBuildingsFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";


export default function Home() {

  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center imageBackground">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <h1 className="text-4xl font-bold font-Ourland text-yellow">Soy</h1>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-10 ">
          <button onClick={() => router.push('/signupEnterprise')} className="colCenter py-10 px-20 gap-4 hover:text-yellow  hover:bg-darkBlue rounded-md bg-yellow text-darkBlue">
            <BsBuildingsFill size={50}/>
            <p className="font-montserrat">Empresa</p>
          </button>
          <button onClick={() => router.push('/signupWorker')} className="colCenter py-10 px-20 gap-4 hover:text-yellow  hover:bg-darkBlue rounded-md bg-yellow text-darkBlue">
            <GrUserWorker size={50} />
            <p className="font-montserrat">Trabajador</p>
          </button>
      </div>
    </main>
  )
}