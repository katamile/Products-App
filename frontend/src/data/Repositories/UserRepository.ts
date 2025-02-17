import { Post, Get, Delete, Put } from "../HttpClient/ClientMethods";
import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";
import { IUserRepository } from "../Interfaces/IUserRepository";
import { User } from "../Entities/User";
import { UserDTO } from "../DTOs/UserDTO";

export const UserRepository: IUserRepository = {
    CreateAsync: async function (user: User): Promise<MessageInfoDTO> {
        try{
            const res = await Post<MessageInfoDTO>("auth/register", user as UserDTO);
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    DeleteAsync: async function (id: number): Promise<MessageInfoDTO> {
        try{
            const res = await Delete<MessageInfoDTO>("users/delete/", id)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    GetAllAsync: async function (): Promise<UserDTO[]> {
        try {
            const res = await Get<MessageInfoDTO>("users/all");
    
            if (res?.users) {
                return res.users;
            }
    
            console.warn("No users found in response");
            return [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    GetByIdAsync: async function (id: number): Promise<User> {
        throw new Error("Function not implemented.");
    },
    GetByCriteria: async function (idUser: number): Promise<User> {
        try{
            const res = await Get<User>("/transactions/" + idUser)
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    UpdateAsync: async function (user: User): Promise<MessageInfoDTO> {
        try{
            const res = await Put<MessageInfoDTO>("/update/" + user.id, user as UserDTO);
            return res;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }
}