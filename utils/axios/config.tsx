import axios from 'axios';

const getActiveToken = (): string => {
  return 'dev@eatological.de'
}

export const backend = axios.create({
  baseURL: 'https://eatological-dev.azurewebsites.net',
  timeout: 100000,
  headers: {
    'EatologicalToken': getActiveToken(),
    'accept': 'application/json'
  }
});