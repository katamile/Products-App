import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";
import { Categorias } from "../Entities/Categorias";
import { Post, Put, Get, Delete } from "../HttpClient/ClientMethods";
import { ICategoriasRepository } from "../Interfaces/ICategoriasRepository";

export const CategoriasRepository: ICategoriasRepository = {

    CreateAsync: async function (categoria: Categorias): Promise<MessageInfoDTO> {
        try {
            const res = await Post<MessageInfoDTO>("categorias/add", categoria);
            return res;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    DeleteAsync: async function (id: number): Promise<MessageInfoDTO> {
        try {
            const res = await Delete<MessageInfoDTO>("categorias/delete/", id);
            return res;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    GetAllAsync: async function (): Promise<Categorias[]> {
        try {
            const res = await Get<{ categories: Categorias[] }>("categorias/all");
            console.log("repository: ", res)
            if (res?.categories) {
                return res.categories;
            }

            console.warn("No categorias found in response.");
            return [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    GetByIdAsync: async function (id: number): Promise<Categorias> {
        try {
            const res = await Get<{ categoria: Categorias }>(`categorias/${id}`);

            if (res?.categoria) {
                return res.categoria;
            }

            throw new Error("Categoría no encontrada");

        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    GetByCriteria: async function (idLocal: number): Promise<Categorias[]> {
        try {
            const res = await Get<{ categorias: Categorias[] }>(`categorias/local/${idLocal}`);
            return res.categorias ?? [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    UpdateAsync: async function (categoria: Categorias): Promise<MessageInfoDTO> {
        try {
            const res = await Put<MessageInfoDTO>("categorias/update", categoria);
            return res;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};
