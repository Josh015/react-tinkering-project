import { Avatar } from './Avatar';
import { Gender } from './Gender';
import { Note } from './Note';

export interface User {
  id: number | null;
  birthDate: Date;
  name: string;
  avatar: Avatar;
  bio: string;
  gender: Gender;

  notes: Note[];
}
