import localforage from 'localforage';
import { maxBy } from 'lodash';

import users from 'src/assets/users.json';
import { Note, User } from 'src/models';

export async function fetchUsers(): Promise<User[]> {
  const usersData: User[] = users.map((u) => {
    return {
      id: u.id,
      birthDate: new Date(u.birthDate),
      name: u.name,
      avatar: u.avatar,
      bio: u.bio,
      gender: u.gender,
      notes: u.notes.map((n) => {
        return {
          id: n.id,
          title: n.title,
          date: new Date(n.date)
        } as Note;
      })
    } as User;
  });

  await set(usersData);
  return getUsers();
}

export async function getUsers(): Promise<User[]> {
  let users = await localforage.getItem<User[]>('users');
  if (!users) users = [];
  return users;
}

export async function createUser(user: User) {
  const users = await getUsers();
  const lastAdded = maxBy(users, (u) => u.id);

  user.id = (lastAdded?.id ?? 0) + 1;

  users.unshift(user);
  await set(users);
  return user;
}

export async function getUser(id: number): Promise<User | null> {
  const users = await localforage.getItem<User[]>('users');

  if (users === null) {
    return null;
  } else {
    const user = users.find((user) => user.id === id);
    return user ?? null;
  }
}

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

function set(users: User[]): Promise<User[]> {
  return localforage.setItem('users', users);
}
