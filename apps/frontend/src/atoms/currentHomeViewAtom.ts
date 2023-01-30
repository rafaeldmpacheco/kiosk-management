import { atom } from 'recoil';
import { ViewType } from '../@types';

export const currentHomeViewState = atom({
    key: 'currentHomeView',
    default: 'list' as ViewType,
});
