import { User } from '@/lib/types';
import { AptosAccount, HexString } from 'aptos';
import { cookies } from 'next/headers';

type LoggedInUserType = {
  username: string;
  name: string;
  wallet_private_key: string;
};

export const LoggedInUser = async () => {
  const cookieUser = cookies().get('user')?.value;

  let loggedInUser: User | null = cookieUser ? JSON.parse(cookieUser) : null;

  const wallet = loggedInUser?.privateKey
    ? new AptosAccount(new HexString(loggedInUser.privateKey).toUint8Array())
    : null;

  const logout = async () => {
    'use server';
    cookies().delete('user');
  };

  if (!loggedInUser)
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );

  return (
    <div>
      <p>Logged In:</p>
      <p>{wallet && wallet.address().toString()}</p>
      <h1>{loggedInUser.username}</h1>
      <h1>{loggedInUser.name}</h1>
      <form action={logout}>
        <button
          type='submit'
          className='rounded-md bg-red-400 px-6 py-2 text-sm text-white hover:bg-red-500'
        >
          Logout
        </button>
      </form>
    </div>
  );
};
