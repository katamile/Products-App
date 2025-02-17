import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";
import { TransaccionesDTO, TransaccionRequestDTO } from "../DTOs/TransaccionesDTO";
import { Get, Post, Put } from "../HttpClient/ClientMethods";
import { ITransaccionesRepository } from "../Interfaces/ITransaccionesRepository";

export const TransaccionesRepository : ITransaccionesRepository = {
    
    PurchaseAsync: async function (transaction: TransaccionRequestDTO): Promise<MessageInfoDTO> {
        try {
            const res = await Post<MessageInfoDTO>("transactions/purchase", transaction);
            return res;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    SellAsync: async function (transaction: TransaccionRequestDTO): Promise<MessageInfoDTO> {
        try {
            const res = await Post<MessageInfoDTO>("transactions/sell", transaction);
            return res;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    ReturnAsync: async function (transaction: TransaccionesDTO): Promise<MessageInfoDTO> {
        try {
            const res = await Post<MessageInfoDTO>("transactions/return", transaction);
            return res;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    GetAllAsync: async function (page = 0, size = 1000, searchText = ""): Promise<TransaccionesDTO[]> {
        try {
            const res = await Get<{ transactions: TransaccionesDTO[] }>(`transactions/all?page=${page}&size=${size}&searchText=${searchText}`);
            return res.transactions ?? [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    GetByIdAsync: async function (id: number): Promise<TransaccionesDTO> {
        try {
            const res = await Get<{ transaction: TransaccionesDTO }>(`transactions/${id}`);
            if (res?.transaction) {
                return res.transaction;
            }
            throw new Error("Transacción no encontrada");
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    GetByMonthAndYear: async function (month: number, year: number, idLocal: number): Promise<TransaccionesDTO[]> {
        try {
            const res = await Get<{ transactions: TransaccionesDTO[] }>(`transactions/by-month-year?month=${month}&year=${year}&idLocal=${idLocal}`);
            return res.transactions ?? [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    UpdateStatusAsync: async function (transactionId: number, status: string): Promise<MessageInfoDTO> {
        throw new Error("Function not implemented.");
        // try {
        //     const res = await Put<MessageInfoDTO>(`transactions/update/${transactionId}`, status);
        //     return res;
        // } catch (e) {
        //     console.error(e);
        //     throw e;
        // }
    }
};