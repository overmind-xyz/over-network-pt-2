'use client';

import { useState } from "react";

export default function LoginWindow(
  { setUpProfile }: {
    setUpProfile:  (form: FormData) => Promise<void>;
  }
) {

  /* 
    TODO #1: Add a state variable to store the current error message
  */

  /*
    This function is called to set up the profile of the new user. It is called
    when a user submits the login form. It takes a FormData object as an argument,
    which contains the username and name of the new user.
    @param form - FormData object containing the username and name of the new user
  */
  const onSubmit = async (form: FormData) => {
    /* 
      TODO #3: Set the error state to an empty string
    */

    /* 
      TODO #4: Set up a try catch block to call the setUpProfile() function and set the error state
      if an error is thrown

      HINT: 
        - Use the setUpProfile() function to set up the user's profile and log them in
        - In the catch block, set the error state to the error message (error.message)
    */
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
            {/* 
              TODO #2: Display the error message if it is not an empty string using the error state variable
            */}
            {
              "PLACEHOLDER"
            }
          </p>
        </div>
      </div>
    </form>
  )
}