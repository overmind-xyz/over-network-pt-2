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
import { User } from '@/lib/types';


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

 
  const setUpProfile = async (form: FormData) => {
  
      'use server'
        var name = document.getElementById("name");
        var username = document.getElementById("username")
        const user:User = {name: name!.innerText, username: username!.innerText, privateKey: newPrivateKey(), followers: 0, following: 0}
      storeUser(user)
          try {
            createProfile(user)
            login(user)
          } catch (error) {
            dropUser(user) 
          }
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