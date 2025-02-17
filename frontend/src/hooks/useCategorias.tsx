import { Categorias } from "../data/Entities/Categorias";
import { ICategoriasRepository } from "../data/Interfaces/ICategoriasRepository";
import { CategoriasRepository } from "../data/Repositories/CategoriasRepository";
import { useInventoryContext } from "./useInventoryContext";

const repo: ICategoriasRepository = CategoriasRepository;

export const useCategorias = () => {
    const { appCategorias, setAppCategorias } = useInventoryContext();
    
    return {
        appCategorias,

        async getAllAsync() {
            try {
                const categorias = await repo.GetAllAsync();
                setAppCategorias([...categorias]);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },

        async putAsync(newCategoria: Categorias) {
            try {
                const response = await repo.UpdateAsync(newCategoria);
                setAppCategorias(categorias => categorias.map(cat => 
                    cat.id === newCategoria.id ? { ...newCategoria } : cat
                ));
                return response.message;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },

        async postAsync(newCategoria: Categorias) {
            try {
                const response = await repo.CreateAsync(newCategoria);
                setAppCategorias(categorias => [...categorias, newCategoria]);
                return response.message;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },

        async deleteAsync(id: number) {
            try {
                const response = await repo.DeleteAsync(id);
                setAppCategorias(categorias => categorias.filter(cat => cat.id !== id));
                return response.message;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },

        async getAsync(id: number) {
            try {
                return await repo.GetByIdAsync(id);
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    };
};
