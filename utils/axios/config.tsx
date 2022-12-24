import axios from 'axios';

const getActiveToken = () : string => {
  return 'dev@eatological.de'
}

export const backend = axios.create({
    baseURL: 'https://eatological-dev.azurewebsites.net',
    timeout: 1000,
    headers: {
      'EatologicalToken': getActiveToken(),
      'accept': 'application/json'
    }
  });

export const getBackendStatus = async () => {
    const result = (await backend.get('/status')).data
    console.log(result)
  }