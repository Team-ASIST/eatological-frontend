import axios from 'axios';
import { addUser, token } from './userManagementCalls';

const getActiveToken = () : string => {
  return 'dev@eatological.de'
}

export const unprotectedBackend  = axios.create({
  baseURL: 'https://eatological-dev.azurewebsites.net',
  timeout: 10000,
  headers: {
    Accept: 'application/json'
  }
});

export const backend = axios.create({
    baseURL: 'https://eatological-dev.azurewebsites.net',
    timeout: 10000,
    headers: {
      'EatologicalToken': getActiveToken(),
      Accept: 'application/json'
    }
  });

export const getBackendStatus = async () => {
    const result = (await backend.get('/status')).data
    console.log(result)
  }