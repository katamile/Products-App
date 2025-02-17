import { TransaccionesDTO, TransaccionRequestDTO } from "../data/DTOs/TransaccionesDTO";
import { ITransaccionesRepository } from "../data/Interfaces/ITransaccionesRepository";
import { TransaccionesRepository } from "../data/Repositories/TransaccionesRepository";
import { useInventoryContext } from "./useInventoryContext";

const repo: ITransaccionesRepository = TransaccionesRepository;

export const useTransacciones = () => {
  const { appTransacciones, setAppTransacciones } = useInventoryContext();

  return {
    appTransacciones,
    async getAllAsync(page = 0, size = 1000, searchText = "") {
      try {
        const handle = await repo.GetAllAsync(page, size, searchText);
        setAppTransacciones([...handle]);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getAsync(idTransaccion: number) {
      try {
        return await repo.GetByIdAsync(idTransaccion);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async purchaseAsync(transaction: TransaccionRequestDTO) {
      try {
        const handle = await repo.PurchaseAsync(transaction);
        return handle.message;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async sellAsync(transaction: TransaccionRequestDTO) {
      try {
        const handle = await repo.SellAsync(transaction);
        return handle.message;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async returnAsync(transaction: TransaccionesDTO) {
      try {
        const handle = await repo.ReturnAsync(transaction);
        return handle.message;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async updateStatusAsync(transactionId: number, status: string) {
      try {
        const handle = await repo.UpdateStatusAsync(transactionId, status);
        return handle.message;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getByMonthAndYear(month: number, year: number, idLocal: number) {
      try {
        const handle = await repo.GetByMonthAndYear(month, year, idLocal);
        setAppTransacciones([...handle]);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  };
};
