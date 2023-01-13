import axios, { AxiosInstance } from 'axios'

export const instance: AxiosInstance = axios.create({
  baseURL: 'https://eatological-dev.azurewebsites.net',
  timeout: 100000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  },
});
