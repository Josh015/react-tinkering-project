import { Avatar } from './Avatar';
import { Gender } from './Gender';
import { Note } from './Note';

export type User = {
  id: number | null;
  birthDate: Date;
  name: string;
  avatar: Avatar;
  bio: string;
  gender: Gender;

  notes: Note[];
};
