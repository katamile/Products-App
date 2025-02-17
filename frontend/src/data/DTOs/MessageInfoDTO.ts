import { CategoriasDTO } from "./CategoriasDTO";
import { LocalesDTO } from "./LocalesDTO";
import { ProductDTO } from "./ProductDTO";
import { TransaccionesDTO } from "./TransaccionesDTO";
import { UserDTO } from "./UserDTO";

export type MessageInfoDTO = {
    status: number;                    
    message: string;                   
    token?: string;                    
    role?: string;                  
    expirationTime?: string;           

    totalPages?: number;               
    totalElements?: number;           

    user?: UserDTO;                    
    users?: UserDTO[];                 

    local?: LocalesDTO;                
    locales?: LocalesDTO[];            

    category?: CategoriasDTO;           
    categories?: CategoriasDTO[];       

    product?: ProductDTO;             
    products?: ProductDTO[];          

    transaction?: TransaccionesDTO;    
    transactions?: TransaccionesDTO[];
};