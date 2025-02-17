import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "./AxiosClient";
import { initialUser } from "../../state/initialStates";
import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";

// Configuración global del interceptor (evita repetirlo en cada función)
axiosClient.interceptors.request.use(config => {
    const { Token } = initialUser;
    if (Token) {
        config.headers.Authorization = `Bearer ${Token}`;
    }
    return config;
});

// Función genérica para manejar respuestas
const handleResponse = <T>(response: AxiosResponse<MessageInfoDTO>): T => {
    if (response.data) {
        return response.data as T;
    }
    throw new Error("Respuesta vacía o mal formada.");
};

// Función genérica para manejar errores
const handleError = (error: AxiosError): never => {
    console.error(JSON.stringify(error, null, 3));
    throw error;
};

// Función GET
export const Get = async <T>(
    endpoint: string,
    authorized: boolean = true,
    params?: object
): Promise<T> => {
    return axiosClient
        .get<MessageInfoDTO>(endpoint, { params })
        .then(res => handleResponse<T>(res))
        .catch(handleError);
};

export const Post = async <T extends unknown>(
    endpoint: string,
    data?: object,
    authorized: boolean = true,
    params?: object,
): Promise<T> => {
    const { Token } = initialUser;
    if (authorized) {
        axiosClient.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${Token}`;
            return config;
        });
    }
    return await axiosClient.post(endpoint, data, { params })
        .then(({ data }: AxiosResponse<T>) => data)
        .catch((error: AxiosError<any>) => {
            console.log(JSON.stringify(error, null, 3));
            throw error;
        })
        
};

export const Put = async <T extends unknown>(
    endpoint: string,
    data?: object,
    authorized: boolean = true,
    params?: object,
): Promise<T> => {
    const { Token } = initialUser;
    if (authorized) {
        axiosClient.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${Token}`;
            return config;
        });
    }
    return await axiosClient.put(endpoint, data, { params })
        .then(({ data }: AxiosResponse<T>) => data)
        .catch((error: AxiosError<any>) => {
            console.error(JSON.stringify(error, null, 3));
            throw error;
        })
        
};

export const Delete = async <T extends unknown>(
    endpoint: string,
    id: string | number,
    authorized: boolean = true,
    params?: object,
): Promise<T> => {
    const { Token } = initialUser;
    if (authorized) {
        axiosClient.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${Token}`;
            return config;
        });
    }
    return await axiosClient.delete(endpoint + `${id}`, { params })
        .then(({ data }: AxiosResponse<T>) => data)
        .catch((error: AxiosError<any>) => {
            console.error(JSON.stringify(error, null, 3));
            throw error;
        })
};

