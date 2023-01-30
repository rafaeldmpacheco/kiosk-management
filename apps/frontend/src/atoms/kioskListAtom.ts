import { atom } from 'recoil';
import { KioskType } from '../@types';

export const kioskListState = atom({
    key: 'kioskList',
    default: [] as KioskType[],
});
