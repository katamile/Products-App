import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { useTransacciones } from '../../hooks/useTransacciones';
import { useLocales } from '../../hooks/useLocales';
import { FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';

export const HomeView = () => {
    const { appTransacciones, getByMonthAndYear } = useTransacciones();
    const { appLocales, getAllAsync } = useLocales();
    const [loading, setLoading] = useState<boolean>(true);
    const [month, setMonth] = useState<number>(2);
    const [year, setYear] = useState<number>(2025);
    const [local, setLocal] = useState<number>(1);


    const meses = [
        { value: 1, label: "Enero" },
        { value: 2, label: "Febrero" },
        { value: 3, label: "Marzo" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Mayo" },
        { value: 6, label: "Junio" },
        { value: 7, label: "Julio" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Septiembre" },
        { value: 10, label: "Octubre" },
        { value: 11, label: "Noviembre" },
        { value: 12, label: "Diciembre" }
      ];
      
      const ultimosAnios = [2023, 2024, 2025];
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await getAllAsync(); // Obtener todos los locales
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, []);

    const handleQuery = async () => {
        setLoading(true);
        try {
            // Realizar la consulta con el mes, año y local seleccionados
            await getByMonthAndYear(month, year, local);
        } catch (error) {
            console.error("Error al consultar transacciones:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar las transacciones por tipo
    const ventasData = appTransacciones.filter((transaction) => transaction.tipoTransaccion === 'VENTA');
    const comprasData = appTransacciones.filter((transaction) => transaction.tipoTransaccion === 'COMPRA');

    // Preparar datos para los gráficos
    const ventasChartData = ventasData.map(transaction => ({
        name: `Transacción ${transaction.id}`,
        precio: transaction.totalPrecio,
    }));

    const comprasChartData = comprasData.map(transaction => ({
        name: `Transacción ${transaction.id}`,
        precio: transaction.totalPrecio,
    }));

    if (loading) return <div>Loading...</div>; // Mostrar mensaje de carga

    return (
        <div>
            <h1>Dashboard de Movimientos</h1>

            <Grid container spacing={2} alignItems="center">
            {/* Select de Mes */}
            <Grid item xs={10} sm={3}>
                <FormControl fullWidth variant="filled" margin="normal">
                    <InputLabel>Mes</InputLabel>
                    <Select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        label="Mes"
                    >
                        {meses.map((mes) => (
                            <MenuItem key={mes.value} value={mes.value}>
                                {mes.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Select de Año */}
            <Grid item xs={10} sm={3}>
                <FormControl fullWidth variant="filled" margin="normal">
                    <InputLabel>Año</InputLabel>
                    <Select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        label="Año"
                    >
                        {ultimosAnios.map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Select de Local */}
            <Grid item xs={10} sm={3}>
                <FormControl fullWidth variant="filled" margin="normal">
                    <InputLabel>Local</InputLabel>
                    <Select
                        value={local}
                        onChange={(e) => setLocal(Number(e.target.value))}
                        label="Local"
                    >
                        {appLocales.map((localItem) => (
                            <MenuItem key={localItem.id} value={localItem.id}>
                                {localItem.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Botón para realizar la consulta */}
            <Grid item xs={10} sm={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleQuery}
                    sx={{ marginTop: 2 }}
                >
                    Consultar
                </Button>
            </Grid>
        </Grid>

            {/* Gráfico de Ventas */}
            <h2>Ventas</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={ventasChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="precio" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

            {/* Gráfico de Compras */}
            <h2>Compras</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={comprasChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="precio" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
