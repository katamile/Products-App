import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useLocales } from '../../hooks/useLocales';
import { initialAppLocales } from '../../state/initialStates';
import { LocalesCreate } from './components/SucursalesCreate';
import { LocalesTableView } from './components/SucursalesTableView';

export const SucursalesView = () => {
    const { appLocales, getAllAsync } = useLocales();
    const { form, setForm, setStateForm } = useForm(initialAppLocales);

    useEffect(() => {
        getAllAsync().then();
    }, []);

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Sucursales
            </Typography>
            <LocalesCreate />
            <LocalesTableView rows={appLocales} setStateForm={setStateForm} />
        </>
    );
};