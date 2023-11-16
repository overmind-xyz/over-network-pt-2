import { AuthType } from '@/lib/types';
import { promises as fs } from 'fs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { Avatar } from './avatar';
import { getUsers } from '@/lib/storage';
import { createProfileIfNeeded } from '@/lib/contract';

const loginUserSchema = z.object({
  username: z.string(),
});

export default async function AuthAccounts() {
  const users = await getUsers();

  const logInUser = async (formData: FormData) => {
    'use server';

    const loginUser = loginUserSchema.parse({
      username: formData.get('username'),
    });

    const users = await getUsers();

    if (!users || !users[loginUser.username]) return;

    const user = users[loginUser.username];

    await createProfileIfNeeded(user);

    cookies().set('user', JSON.stringify(user));
  };

  if (Object.keys(users).length === 0) return null;

  return (
    <div className='flex flex-col space-y-3'>
      <p className='text-xs font-bold uppercase text-neutral-100'>
        Existing Accounts
      </p>
      {Object.values(users)
        .filter(({ privateKey }) => !!privateKey)
        .map((user, index) => {
          return (
            <form key={user.username} action={logInUser}>
              <input hidden value={user.username} name='username' />
              <button type='submit' className='w-full'>
                <div className='flex flex-row items-center justify-start space-x-3 rounded-xl border border-neutral-200 bg-neutral-300 px-4 py-2 hover:border-neutral-100'>
                  <Avatar className='h-11 w-11' user={user} />
                  <div className='flex flex-col items-start -space-y-0.5'>
                    <p className='text-lg font-medium capitalize'>
                      {user.name}
                    </p>
                    <p className='text-neutral-100'>@{user.username}</p>
                  </div>
                </div>
              </button>
            </form>
          );
        })}
    </div>
  );
}
