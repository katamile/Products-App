import { Post, Get, Delete, Put } from "../HttpClient/ClientMethods";
import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";
import { ILocalesRepository } from "../Interfaces/ILocalesRepository";
import { Locales } from "../Entities/Locales";
import { LocalesDTO } from "../DTOs/LocalesDTO";

export const LocalesRepository: ILocalesRepository = {
    CreateAsync: async function (locales: Locales): Promise<MessageInfoDTO> {
        try{
            const res = await Post<MessageInfoDTO>("locales/add", locales as LocalesDTO);
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    DeleteAsync: async function (id: number): Promise<MessageInfoDTO> {
        try{
            const res = await Delete<MessageInfoDTO>("locales/delete/", id)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    GetAllAsync: async function (): Promise<LocalesDTO[]> {
        try {
            const res = await Get<MessageInfoDTO>("locales/all");
            if (res?.locales) {
                return res.locales;
            }
    
            console.warn("No locales found in response.");
            return [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    GetByIdAsync: async function (id: number): Promise<Locales> {
        try {
            const res = await Get<MessageInfoDTO>("/" + id);
    
            if (res?.local) {
                return res.local;
            }

            throw new Error("Local no encontrado");

        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    GetByCriteria: async function (idUser: number): Promise<Locales> {
        try{
            const res = await Get<Locales>("/transactions/" + idUser)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    UpdateAsync: async function (user: Locales): Promise<MessageInfoDTO> {
        try{
            const res = await Put<MessageInfoDTO>("/update", user as LocalesDTO);
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }
}