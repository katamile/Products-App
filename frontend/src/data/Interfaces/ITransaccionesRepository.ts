import { MessageInfoDTO } from "../DTOs/MessageInfoDTO";
import { TransaccionesDTO, TransaccionRequestDTO } from "../DTOs/TransaccionesDTO";

export interface ITransaccionesRepository {
    PurchaseAsync(transaction: TransaccionRequestDTO): Promise<MessageInfoDTO>;
    SellAsync(transaction: TransaccionRequestDTO): Promise<MessageInfoDTO>;
    ReturnAsync(transaction: TransaccionesDTO): Promise<MessageInfoDTO>;
    GetAllAsync(page?: number, size?: number, searchText?: string): Promise<TransaccionesDTO[]>;
    GetByIdAsync(id: number): Promise<TransaccionesDTO>;
    GetByMonthAndYear(month: number, year: number, idLocal: number): Promise<TransaccionesDTO[]>;
    UpdateStatusAsync(transactionId: number, status: string): Promise<MessageInfoDTO>;
}