import { Locales } from "../data/Entities/Locales";
import { ILocalesRepository } from "../data/Interfaces/ILocalesRepository";
import { LocalesRepository } from "../data/Repositories/LocalesRepository";
import { useInventoryContext } from "./useInventoryContext";

const repo: ILocalesRepository = LocalesRepository;

export const useLocales = () => {
    const { appLocales, setAppLocales } = useInventoryContext();
    return {
        appLocales,
        async getAllAsync(){
            try{
                const handle = await repo.GetAllAsync();
                console.log("handle: ", handle);
                setAppLocales([...handle])
            }
            catch(e){
                console.error(e)
                throw e;
            }
        },
        async putAsync(newLocal: Locales){
            try{
                const handle = await repo.UpdateAsync(newLocal);
                setAppLocales(formy => formy.map(u => {
                    if(newLocal.id === u.id){
                        return {
                            ...newLocal
                        }
                    }
                    return u;
                }))
                return handle.message;
            }
            catch(e){
                console.error(e)
                throw e;
            }
        },
        async postAsync(newLocal: Locales){
            try{
                const handle = await repo.CreateAsync(newLocal);
                setAppLocales(formy => [...formy, newLocal])
                return handle.message;
            }
            catch(e){
                console.error(e)
                throw e;
            }
        },
        async deleteAsync(id:number){
            try{
                const handle = await repo.DeleteAsync(id);
                setAppLocales(formy => formy.filter(u => u.id !== id))
                return handle.message;
            }
            catch(e){
                console.error(e)
                throw e;
            }
        },
        async getAsync(id:number){
            try{
                const handle = await repo.GetByIdAsync(id);
                return handle;
            }
            catch(e){
                console.error(e)
                throw e;
            }
        }
    }
}