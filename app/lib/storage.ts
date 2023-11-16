import {
  AuthType,
  User,
} from './types';
import { promises as fs } from 'fs';
import { stripUsername } from './utils';

const AUTH_FILE = '../app/storage/auth.json';

export async function getUsers() {
  const fileContents = await fs.readFile(AUTH_FILE, 'utf8');
  const users: AuthType = JSON.parse(fileContents);

  return users;
}

export async function storeUser(user: Omit<User, 'followers' | 'following'>) {

  if (await getNumberOfUsers() >= 2) {
    throw new Error('Max number of users reached');
  }

  const existing = await getUsers();

  if (existing[stripUsername(user.username)]) {
    throw new Error('User already exists');
  }

  await fs.writeFile(
    AUTH_FILE,
    JSON.stringify(
      Object.assign({}, existing, { [stripUsername(user.username)]: user })
    )
  );
}

export async function dropUser(user: Omit<User, 'followers' | 'following'>) {
  const existing = await getUsers();

  delete existing[stripUsername(user.username)];

  await fs.writeFile(AUTH_FILE, JSON.stringify(existing));
}

export async function getNumberOfUsers() {
  const users = await getUsers();

  return Object.keys(users).length;
}
