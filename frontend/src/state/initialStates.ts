import { Categorias } from "../data/Entities/Categorias";
import { Locales } from "../data/Entities/Locales";
import { Product } from "../data/Entities/Product";
import { Transacciones, TransaccionRequest } from "../data/Entities/Transacciones";
import { User } from "../data/Entities/User";
import { UserState } from "../data/Entities/UserLogin";
import { baseStorage } from "../services/baseStorage";
const { GetData } = baseStorage();

export const initialUser: UserState =
  GetData("products-app") ||
  ({
    Name: "",
    Role: "",
    Token: "",
    IsLogged: false,
  } as UserState);

export const initialAppUser: User = {
  id:0,
  name:"",
  email: "",
  password:"",
  role:"",
};

export const initialAppProduct: Product = {
  id: 0,   
  idCategoria: 0,  
  idLocal: 0,     
  nombre: "", 
  codigoBarra: "",
  price: 0,   
  stock: 0,
  description: "",
  imageUrl: "",
  expiryDate: new Date(),
};

export const initialAppLocales: Locales = {
  id: 0,
  codigo: "",
  nombre: "",
  direccion: "",
  ciudad: "",
  provincia:"",
  telefono: "",
};

export const initialAppCategorias: Categorias={
  id: 0,
  nombre: "",
  idLocal: 1,
}

export const initialAppTransacciones : Transacciones = {
  id: 0,
  totalProductos:0,
  totalPrecio: "",
  tipoTransaccion: "",
  status: "",
  description: "",
  updatedAt: new Date(),
  createdAt: new Date(),
  user:1,
  product:1,
  local:1,
};

export const initialAppTransaccionesRequest : TransaccionRequest = {
    idProduct: 0,
    quantity: 0,
    description: "",
    idLocal: 0,
};