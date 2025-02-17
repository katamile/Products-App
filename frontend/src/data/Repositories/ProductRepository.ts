import { IProductRepository } from "../Interfaces/IProductRepository";
import { Product } from "../Entities/Product";
import { ProductDTO } from "../DTOs/ProductDTO";
import { Post, Get, Delete, Put } from "../HttpClient/ClientMethods";
import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";

export const ProductRepository: IProductRepository = {
    CreateAsync: async function (product: Product): Promise<MessageInfoDTO> {
        try{
            const res = await Post<MessageInfoDTO>("products/add", product as ProductDTO);
            console.log(res);
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    DeleteAsync: async function (id: number): Promise<MessageInfoDTO> {
        try{
            const res = await Delete<MessageInfoDTO>("products/delete/", id)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    GetAllAsync: async function (): Promise<ProductDTO[]> {
        try {
            const res = await Get<MessageInfoDTO>("products/all");
            if (res?.products) {
                return res.products;
            }
    
            console.warn("No products found in response.");
            return [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    GetByIdAsync: async function (id: number): Promise<Product> {
        try{
            const res = await Get<Product>("products/" + id)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    GetByCriteria: async function (id: number): Promise<Product> {
        try{
            const res = await Get<Product>("products/consultaPorNombre/" + id)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    UpdateAsync: async function (product: Product): Promise<MessageInfoDTO> {
        try{
            const res = await Put<MessageInfoDTO>("products/update", product as ProductDTO);
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }
}