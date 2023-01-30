import { atom } from 'recoil';

export const currentKioskState = atom({
    key: 'currentKiosk',
    default: '',
});
