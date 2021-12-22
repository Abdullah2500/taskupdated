import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface IHeader {
  [Authorization:string] : any
}

interface IStructure {
  [params:  string] : any
}

export default async (url:string, method:string, token?:boolean, body?:Object) => {
  let headers:IHeader = {};
  if (token) {
    const userToken = await AsyncStorage.getItem('token');
    headers.Authorization = `Bearer ${userToken}`;
  }

  const structure:IStructure = {
    url,
    method,
    headers,
  };

  if (method === 'GET') {
    structure.params = body;
  } else {
    structure.data = body;
  }
  return axios(structure)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return err.response.data;
    });
};
