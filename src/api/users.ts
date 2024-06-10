import localforage from 'localforage';

import { User } from './types';
import users from 'src/assets/users.json';

export async function fetchUsers(): Promise<User[]> {
  await localforage.setItem('users', users);
  return getUsers();
}

export async function getUsers(): Promise<User[]> {
  let users = await localforage.getItem<User[]>('users');
  if (!users) users = [];
  return users;
}

// export async function createUser({ title, content }) {
//   const id = Math.random().toString(36).substring(2, 9);
//   const user = { id, title, content };
//   const users = await getUsers();
//   users.unshift(user);
//   await set(users);
//   return user;
// }

// export async function getUser(id) {
//   const users = await localforage.getItem('users');
//   const user = users.find((user) => user.id === id);
//   return user ?? null;
// }

// export async function deleteUser(id) {
//   const users = await localforage.getItem('users');
//   const index = users.findIndex((user) => user.id === id);
//   if (index > -1) {
//     users.splice(index, 1);
//     await set(users);
//     return true;
//   }
//   return false;
// }

// function set(users) {
//   return localforage.setItem('users', users);
// }
