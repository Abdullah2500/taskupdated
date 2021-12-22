import api from './api';
import {COMMUNITY_URL, LOGIN_URL, REGISTER_URL} from './constants';

// let serviceType : (url:string, method: string) => Object;

export const registerApi = async (data:Object) => {
  const url:string = REGISTER_URL;
  const method:string = 'POST';
  const res = await api(url, method, false, data);
  return res;
};

export const loginApi = async (data:Object) => {
  const url:string = LOGIN_URL;
  const method:string = 'POST';
  const res = await api(url, method, false, data);
  return res;
};

export const getCommunitiesApi = async () => {
  const url:string = COMMUNITY_URL;
  const method:string = 'GET';
  const res = await api(url, method, true);
  return res;
};
