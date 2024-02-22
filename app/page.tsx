"use client"
import { useState } from "react"
import React from 'react'
import { Form } from "./components/Form/Form";


export default function Home() {

  const [response, setResponse] = useState("");
  return (
    <>
      <Form setResponse={setResponse}></Form>
      {
        response && (
          < div className="flex flex-row justify-center my-5">
            <h1 className="text-xl text-white">{response}</h1>
          </div >
        )
      }
    </>
  )
}
