"use client"
import { useEffect, useState } from "react";
import FormLogin from "@/components/FormLogin/FormLogin";

export default function Home() {
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    const adjustHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    window.addEventListener("resize", adjustHeight);
    adjustHeight();

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <div
      className="flex w-full flex-col items-center justify-start lg:justify-center bg-darkBlue lg:bg-transparent imageBackground overflow-hidden"
      style={{ height: viewportHeight }} 
    >
      <FormLogin />
    </div>
  )
}
