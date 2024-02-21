"use client"
import { FormEvent, useState } from "react"
import Input from "./components/Form/Input";

export default function Home() {
  const [input, setInput] = useState("")

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
  }

  return (
    <form className='flex content-center justify-center flex-col m-10' onSubmit={handleOnSubmit}>
      <Input label="Enter a phrase to make it better" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate</button>
    </form>
  )
}
