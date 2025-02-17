import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { initialAppTransacciones } from '../../state/initialStates';
import { useTransacciones } from '../../hooks/useTransacciones';
import { TransaccionesSell } from './components/TransaccionesSell';
import { TransaccionesTableView } from './components/TransaccionesTableView';
import { TransaccionesPurchase } from './components/TransaccionesPurchase';
import { useProduct } from '../../hooks/useProduct';
import { useLocales } from '../../hooks/useLocales';

export const TransaccionesView = () => {
    const { appTransacciones, getAllAsync: getAllTransacciones } = useTransacciones();
    const { appProducts, getAllAsync: getAllProducts } = useProduct();    
    const { appLocales, getAllAsync: getAllLocales } = useLocales();    
    const { form, setForm, setStateForm } = useForm(initialAppTransacciones);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllProducts();
                await getAllTransacciones();
                await getAllLocales();
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <>
            <Typography variant="h2" gutterBottom>
                Transacciones
            </Typography>
            <TransaccionesPurchase products={appProducts} locales={appLocales}/> 
            <TransaccionesSell products={appProducts} locales={appLocales}/>
            <TransaccionesTableView rows={appTransacciones} setStateForm={setStateForm} />
        </>
    );
};