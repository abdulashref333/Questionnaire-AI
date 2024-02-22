

import { FormEvent, useEffect, useState } from "react"
import Input from "./Input";
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation";

interface IUser {
  id?: string,
  email: string,
  name: string,
  image?: string
}

const API_AUTH_URL = "/api/auth/signin";
export const Form = ({ setResponse }: { setResponse: (response: string) => void }) => {
  const [input, setInput] = useState("")
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    async function getSessionAsync() {
      const session = await getSession();
      if (session && session.user) {
        const { user }: { user: IUser } = session;
        setUser(user)
      } else {
        router.push(API_AUTH_URL)
      }
    }

    getSessionAsync();
  }, []);


  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input) {
      setLoading(true);
      setResponse("");
      fetch("/api/sentence-improvement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence: input }),
      }).then(async (res) => {
        if (res.ok) {
          const { response } = await res.json();

          setResponse(response)
          setLoading(false);
        }
      });
    }
  }


  return (
    <>
      <div className="flex flex-row justify-center my-5">
        <h1 className="text-xl text-white">Hello, {user?.name}!</h1>
      </div>
      <form className='flex content-center items-center justify-between m-10' onSubmit={handleOnSubmit}>
        <Input
          label="Enter a phrase to make it better"
          type="text"
          value={input} onChange={(e) => { setInput(e.target.value) }}
        />
        <button
          className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded inline-flex items-center text-center"
          type="submit"
          disabled={loading}
        >
          Generate
        </button>
      </form>
      {
        loading && (
          <div className="flex flex-row justify-center my-5">
            <h1 className="text-xl text-white">Loading...</h1>
          </div>
        )
      }
    </>
  )
}