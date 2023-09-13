import axios, { AxiosRequestConfig } from 'axios'

export const httpClient = axios.create();

/**
 * Use Axios to make a get request
 * @param url request url
 * @param header header options
 * @returns {Promise<any>}
 */
export const get = async  (url: string, header?: AxiosRequestConfig): Promise<any> => {
   return axios.get(url, header);
}

/**
 * Use Axios to make a post request
 * @param url request url
 * @param body request body
 * @param header header options
 * @returns {Promise<any>}
 */
export const post = async (url:string, body?:AxiosRequestConfig<any> , header?: AxiosRequestConfig): Promise<any> => {
    return axios.post(url, body, header)
}

/**
 * Use Axios to make a delete request
 * @param url request url
 * @param header header options
 * @returns {Promise<any>}
 */
export const remove = async (url: string, header?:AxiosRequestConfig): Promise<any> => {
    return axios.delete(url,header)
}