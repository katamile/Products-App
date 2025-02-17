import { useState } from 'react'
import { UserState } from '../data/Entities/UserLogin';
import { initialUser } from './initialStates';
import { MyContext, MyContextProps } from '../hooks/useInventoryContext';
import { User } from '../data/Entities/User';
import { Product } from "../data/Entities/Product";
import { Locales } from '../data/Entities/Locales';
import { Categorias } from '../data/Entities/Categorias';
import { Transacciones } from '../data/Entities/Transacciones';

interface SurveyContextProps{
    children: JSX.Element;
}

export const InventoryContext = ({ children }: SurveyContextProps) => {
  const [user, setUser] = useState<UserState>(initialUser);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [appUsers, setAppUsers] = useState<User[]>([]);
  const [appProducts, setAppProducts] = useState<Product[]>([]);
  const [appLocales, setAppLocales] = useState<Locales[]>([]);
  const [appCategorias, setAppCategorias] = useState<Categorias[]>([]);
  const [appTransacciones, setAppTransacciones] = useState<Transacciones[]>([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const value: MyContextProps = {
    user,
    appUsers,
    openEditDialog,
    openDeleteDialog,
    openCreateDialog,
    setOpenCreateDialog,
    setOpenDeleteDialog,
    setOpenEditDialog,
    setAppUsers,
    setUser,
    appProducts,
    setAppProducts,
    setOpenDetailDialog,
    openDetailDialog,
    appLocales,
    setAppLocales,
    appCategorias,
    setAppCategorias,
    appTransacciones,
    setAppTransacciones
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
