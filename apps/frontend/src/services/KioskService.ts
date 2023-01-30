import axios from 'axios';
import { KioskType } from '../@types';

const BASE_URL = 'http://localhost:3002/kiosk';

export const updateKiosk = async (kiosk: KioskType) => axios.patch(`${BASE_URL}/${kiosk.id}`, kiosk);

export const createKiosk = async (kiosk: KioskType) => axios.post(BASE_URL, kiosk);

export const getKiosks = async () => axios.get(BASE_URL);

export const deleteKiosk = async (id: string) => axios.delete(`${BASE_URL}/${id}`);