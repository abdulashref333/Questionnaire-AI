"use client"
import { FormEvent, useState } from "react"
import Input from "./components/Form/Input";

export default function Home() {
  const [input, setInput] = useState("")

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <form className='flex content-center items-center justify-between m-10' onSubmit={handleOnSubmit}>
      <Input
        label="Enter a phrase to make it better"
        type="text"
        value={input} onChange={(e) => { setInput(e.target.value) }}
      />
      <button
        className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded inline-flex items-center text-center"
      >
        Generate
      </button>
    </form>
  )
}
