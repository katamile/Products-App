import { Typography } from "@mui/material";
import { useEffect } from "react";
import { ProductTableView } from "./components/ProductTableView";
import { ProductCreate } from "./components/ProductCreate";
import { useProduct } from "../../hooks/useProduct";
import { initialAppProduct } from "../../state/initialStates";
import { useForm } from "../../hooks/useForm";
import { ProductEdit } from "./components/ProductEdit";
import { useLocales } from "../../hooks/useLocales";
import { useCategorias } from "../../hooks/useCategorias";

export const ProductView = () => {
  const { appProducts, getAllAsync } = useProduct();
  const { appLocales, getAllAsync: getAllLocales } = useLocales();    
  const { appCategorias, getAllAsync: getAllCategorias } = useCategorias();    
  const { form, setForm, setStateForm } = useForm(initialAppProduct);

  useEffect(() => {
    const fetchData = async () => {
        try {
            await getAllAsync();
            await getAllLocales();
            await getAllCategorias();
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    fetchData();
}, []);

  return (
    <>
      <Typography variant="h2">Productos</Typography>
      <ProductCreate locales={appLocales} categorias={appCategorias}/>
      <ProductTableView rows={appProducts} setStateForm={setStateForm} locales={appLocales} categorias={appCategorias}  />
      {/* <ProductEdit setStateForm={setStateForm} form={form} setForm={setForm} /> */}
    </>
  );
};
