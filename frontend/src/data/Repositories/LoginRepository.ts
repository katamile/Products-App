/* eslint-disable no-useless-catch */
import { jwtDecode } from "jwt-decode";
import { JWTRequest } from "../DTOs/JWTRequest";
import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";
import { UserLoginRequest } from "../DTOs/UserLoginRequest";
import { UserState, UserLogin } from "../Entities/UserLogin";
import { Post } from "../HttpClient/ClientMethods";
import { ILoginRepository } from "../Interfaces/ILoginRepository";
import { JWTResponse } from "../DTOs/JWTResponse";

export const LoginRepository: ILoginRepository = {
    validateTokenAsync: function (token: string): Promise<MessageInfoDTO> {
        throw new Error("Function not implemented.");
    },

    loginAsync: async function (user: UserLogin): Promise<UserState> {
        try {
            const res = await Post<JWTRequest>("auth/login", user as UserLoginRequest, false);
            
            const tokenDecoded = jwtDecode<JWTResponse>(res.token);
            const userLogged: UserState = {
                Token: res.token,
                IsLogged: true,
                Role: res.role,
                ExpirationTime: res.expirationTime
            };
            
            return userLogged;
        } catch (e) {
            throw e;
        }
    },
    refreshTokenAsync: function (token: string): Promise<UserState> {
        throw new Error("Function not implemented.");
    }
}
