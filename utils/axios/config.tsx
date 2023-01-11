import axios from 'axios';
import { store } from '../../redux/store';

export const backend = () => {
  const defaultOptions = {
    baseURL: 'https://eatological-dev.azurewebsites.net',
    timeout: 100000,
    headers: {
      'accept': 'application/json',
      'EatologicalToken': 'dev@eatological.de'
    },
  };

  // Create instance
  let backend = axios.create(defaultOptions);

  // Set the AUTH token for any request
  backend.interceptors.request.use(function (config) {
    const token = store.getState().user.token;
    if (token.startsWith("T")) {
      (config as any).headers['EatologicalToken'] = token;
    }
    if (token == "") {
      (config as any).headers['EatologicalToken'] = 'dev@eatological.de';
    }
    return config;
  });

  return backend;
};