import { atom } from 'jotai';

export const isDrawerOpenAtom = atom(false);
export const textDirectionAtom = atom<'ltr' | 'rtl'>('ltr');
