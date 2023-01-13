import { instance } from '.';
import { AxiosError, AxiosRequestConfig } from 'axios'


const setUpInterceptor = (token: string) => {
    instance.interceptors.request.clear()

    instance.interceptors.request.use(
        async (config: any | AxiosRequestConfig) => {
            if (token.startsWith("T")) {
                (config as any).headers['EatologicalToken'] = token;
            }
            if (token == "") {
                (config as any).headers['EatologicalToken'] = 'dev@eatological.de';
            }

            return config
        }
    )
}

export default setUpInterceptor