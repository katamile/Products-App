import { createContext, useContext } from "react";
import { UserState } from "../data/Entities/UserLogin";
import { User } from "../data/Entities/User";
import { Product } from "../data/Entities/Product";
import { Locales } from "../data/Entities/Locales";
import { Categorias } from "../data/Entities/Categorias";
import { Transacciones } from "../data/Entities/Transacciones";

export interface MyContextProps {
  user: UserState;

  appUsers: User[];
  appProducts: Product[];
  appLocales: Locales[];
  appCategorias: Categorias[];
  appTransacciones: Transacciones[];

  openEditDialog: boolean;
  openDeleteDialog: boolean;
  openCreateDialog: boolean;

  openDetailDialog: boolean;
  setOpenDetailDialog: React.Dispatch<React.SetStateAction<boolean>>;

  setOpenCreateDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;

  setAppUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setAppProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setAppLocales: React.Dispatch<React.SetStateAction<Locales[]>>;
  setAppCategorias: React.Dispatch<React.SetStateAction<Categorias[]>>;
  setAppTransacciones: React.Dispatch<React.SetStateAction<Transacciones[]>>;

  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}
export const MyContext = createContext<MyContextProps>(null!);
export const useInventoryContext = () => useContext(MyContext);
