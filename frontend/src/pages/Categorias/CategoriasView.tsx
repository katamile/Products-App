import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useCategorias } from '../../hooks/useCategorias';
import { initialAppCategorias } from '../../state/initialStates';
import { CategoriasCreate } from './components/CategoriasCreate';
import { CategoriasTableView } from './components/CategoriasTableView';

export const CategoriasView = () => {
    const { appCategorias, getAllAsync } = useCategorias();
    const { form, setForm, setStateForm } = useForm(initialAppCategorias);

    useEffect(() => {
        getAllAsync();
    }, []);

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Categorías
            </Typography>
            <CategoriasCreate />
            <CategoriasTableView rows={appCategorias} setStateForm={setStateForm} />
        </>
    );
};
