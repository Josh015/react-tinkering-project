import { atom, getDefaultStore } from 'jotai';
import { maxBy } from 'lodash';

import usersJson from 'src/assets/users.json';
import { Note, User } from 'src/models';

export const usersAtom = atom<User[]>([]);

const store = getDefaultStore();

export function fetchUsers(): void {
  const users = getUsers();

  if (users.length == 0) {
    const usersData: User[] = usersJson.map((u) => {
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

    set(usersData);
  }
}

export function getUsers(): User[] {
  const users = store.get(usersAtom);
  return users;
}

export function createUser(user: User) {
  const users = getUsers();
  const lastAdded = maxBy(users, (u) => u.id);

  user.id = (lastAdded?.id ?? 0) + 1;

  set([user, ...users]);
  return user;
}

export function getUser(id: number): User | null {
  const users = getUsers();
  const user = users.find((u) => u.id === id);
  return user ?? null;
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

function set(users: User[]): User[] {
  store.set(usersAtom, users);
  return users;
}
