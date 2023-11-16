import './globals.css';
import { Inter } from 'next/font/google';
import Accounts from '@/components/Accounts';
import localFont from 'next/font/local';
import { Avatar } from '@/components/avatar';
import { getMe, login } from '@/lib/actions';
import { logout } from '@/lib/actions';
import { newUserSchema } from '@/lib/zod';
import { dropUser, getNumberOfUsers, storeUser } from '@/lib/storage';
import { createProfile, newPrivateKey } from '@/lib/contract';
import LoginWindow from './loginWindow';

const inter = Inter({ subsets: ['latin'] });

const cal = localFont({
  src: './cal.woff2',
  display: 'swap',
  variable: '--font-cal',
});

const matter = localFont({
  src: [
    {
      path: './Matter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Matter-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Matter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-matter',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  /*
    This function is called to set up the profile of a new user. It is called
    when a user submits the login form. It takes a FormData object as an argument,
    which contains the username and name of the new user.
    @param form - FormData object containing the username and name of the new user
  */
  const setUpProfile = async (form: FormData) => {
    /*
      TODO #1: Indicate that this function is a server function by adding 'use server';
    */

    /*
      TODO #2: Create the new User object with a username, name, and privateKey
    
      HINT: 
        - 
        - Use the newPrivateKey() function to generate a new private key for the user
    */

    /* 
      TODO #3: Store the user in the local account cache

      HINT: Use the storeUser() function to store the user
    */

    /* 
      TODO #4: Set up a try catch block to create the user's profile and log them in if successful.

      HINT: 
        - Use the createProfile() and login() functions to create the user's 
          profile and log them in
        
        - In the catch block, use the dropUser() function to remove the user 
          from the local account cache. Then, throw the error to be caught by the catch block in
          the loginWindow.tsx file.
    */
  }

  if (!me) {
    return (
      <html lang='en'>
        <body
          className={`${cal.variable} ${matter.variable} ${inter.className}`}
        >
          <div className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
            <div className='w-full max-w-xs space-y-6 rounded-xl border border-neutral-300 bg-neutral-400 px-6 py-4'>
              <p className='text-2xl font-bold'>Log in to Over Network</p>
              {
                await getNumberOfUsers() >= 2 ? 
                <p className='text-sm font-medium text-neutral-100'>
                  You have reached the maximum number of accounts.
                </p> :
                <LoginWindow setUpProfile={setUpProfile} /> 
              }
              <Accounts />
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang='en'>
      <body className={`${cal.variable} ${matter.variable} ${inter.className}`}>
        <div className='flex h-screen flex-row items-center justify-center'>
          <form action={logout} className='flex flex-col gap-3 border rounded-xl px-4 py-2 bg-neutral-400 border-neutral-300'>
            <p className='text-2xl font-bold'>
              You are logged in!
            </p>
            <p className='text-xs font-bold uppercase text-neutral-100'>
              Your account
            </p>
            <div className='flex flex-row items-center justify-start space-x-3 rounded-xl border border-neutral-200 bg-neutral-300 px-4 py-2'>
              <Avatar className='h-11 w-11' user={me} />
              <div className='flex flex-col items-start -space-y-0.5'>
                <p className='text-lg font-medium capitalize'>
                  {me.name}
                </p>
                <p className='text-neutral-100'>@{me.username}</p>
              </div>
            </div>
            <button
              type='submit'
              className='rounded bg-blue-500 py-2.5 text-sm font-medium hover:bg-blue-400'
            >
              Log out
            </button>
          </form>
        </div>
      </body>
    </html>
  );
}
