import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { useForm } from "../../../hooks/useForm";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { initialAppTransaccionesRequest } from "../../../state/initialStates";
import { useTransacciones } from "../../../hooks/useTransacciones";
import { ProductDTO } from "../../../data/DTOs/ProductDTO";
import { LocalesDTO } from "../../../data/DTOs/LocalesDTO";

interface TransaccionesSellProps {
    products: ProductDTO[];
    locales: LocalesDTO[];
}

export const TransaccionesSell = ({ products, locales }: TransaccionesSellProps) => {
    const { openCreateDialog, handleOpenCreateDialog, handleCloseCreateDialog } = useDialog();
    const { form, setForm, setStateForm } = useForm({ ...initialAppTransaccionesRequest });
    const { sellAsync } = useTransacciones();
 
    const handleSubmit = () => {
        sellAsync(form)
            .then(res => {
                inventoryAlert(res);
                setStateForm({ ...initialAppTransaccionesRequest });
                window.location.reload();
            })
            .catch(e => inventoryAlert(e.response?.data.message ?? "Error inesperado"));
    };

    return (
        <>
            <Box sx={{ marginBottom: 6, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={handleOpenCreateDialog}
                    variant="contained"
                    size="small"
                    sx={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        width: '15%',
                        height: 40
                    }}
                >
                    Venta
                </Button>
            </Box>

            <FormDialog
                title={"Registrar Venta"}
                handleSubmit={handleSubmit}
                openDialog={openCreateDialog}
                handleDialog={handleCloseCreateDialog}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth variant="filled" margin="normal">
                        <InputLabel>Producto</InputLabel>
                        <Select
                            name="product"
                            value={form.idProduct}  
                            onChange={(e) => setForm(Number(e.target.value), "idProduct")} 
                            label="Producto"
                            required
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="filled"
                        fullWidth
                        label="Cantidad de productos"
                        placeholder="ej: 5"
                        value={form.quantity}
                        onChange={e => setForm(Number(e.target.value), "quantity")}
                        required
                    />
                    <TextField
                        variant="filled"
                        fullWidth
                        label="Descripción"
                        placeholder="opcional"
                        value={form.description}
                        onChange={e => setForm(e.target.value, "description")}
                    />
                    <FormControl fullWidth variant="filled" margin="normal">
                        <InputLabel>Local / Sucursal</InputLabel>
                        <Select
                            name="local"
                            value={form.idLocal} 
                            onChange={(e) => setForm(Number(e.target.value), "idLocal")} 
                            label="Local"
                            required
                        >
                            {locales.map((local) => (
                                <MenuItem key={local.id} value={local.id}>
                                    {local.nombre} 
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </FormDialog>

        </>
    );
};