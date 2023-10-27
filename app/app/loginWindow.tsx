'use client';

import { useState } from "react";

export default function LoginWindow(
  { setUpProfile }: {
    setUpProfile:  (form: FormData) => Promise<void>;
  }
) {

 
  const [error, setError] = useState<string>("")
  const onSubmit = async (form: FormData) => {

   setError("")
        try {
         setUpProfile
         
        } catch (error: any) {
         setError(error.message)
        }
  }

  return (
    <form action={onSubmit} >
      <div className='flex flex-col space-y-3'>
        <p className='text-xs font-bold uppercase text-neutral-100'>
          Create Account
        </p>
        <input
          id='username'
          type='text'
          name='username'
          className='rounded border border-neutral-200 bg-neutral-300 px-3 py-2 text-sm'
          placeholder='Username'
          required
        />
        <input
          id='name'
          type='text'
          name='name'
          className='rounded border border-neutral-200 bg-neutral-300 px-3 py-2 text-sm'
          placeholder='Name'
          required
        />
        <div className="w-full">
          <button
            type='submit'
            className='w-full rounded bg-blue-500 py-2.5 text-sm font-medium hover:bg-blue-400 flex flex-row justify-center items-center space-x-2'
          >
            Create Account
          </button>
          <p className="text-red-500">
            {
            error && <p>{error}</p>
            }
            {
              "PLACEHOLDER"
            }
          </p>
        </div>
      </div>
    </form>
  )
}