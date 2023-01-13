import { instance } from '.';
import { AxiosError, AxiosRequestConfig } from 'axios'


const setUpInterceptor = (token: string) => {
    const handleError = async (error: AxiosError) => {
        return Promise.reject(error)
    }

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

    instance.interceptors.response.use((response) => response, handleError)
}

export default setUpInterceptor