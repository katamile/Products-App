import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { useForm } from "../../../hooks/useForm";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { initialAppTransacciones, initialAppTransaccionesRequest } from "../../../state/initialStates";
import { useTransacciones } from "../../../hooks/useTransacciones";
import { ProductDTO } from "../../../data/DTOs/ProductDTO";
import { LocalesDTO } from "../../../data/DTOs/LocalesDTO";

interface TransaccionesPurchaseProps {
    products: ProductDTO[];
    locales: LocalesDTO[];
}

export const TransaccionesPurchase = ({ products, locales }: TransaccionesPurchaseProps) => {
    const { openEditDialog, handleOpenEditDialog, handleCloseEditDialog } = useDialog();
    const { form, setForm, setStateForm } = useForm({ ...initialAppTransaccionesRequest });
    const { purchaseAsync } = useTransacciones();
 
    const handleSubmit = () => {
        purchaseAsync(form)
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
                    onClick={handleOpenEditDialog}
                    variant="contained"
                    size="small"
                    sx={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        width: '15%',
                        height: 40
                    }}
                >
                    Compra
                </Button>
            </Box>

            <FormDialog
                title={"Registrar Compra"}
                handleSubmit={handleSubmit}
                openDialog={openEditDialog}
                handleDialog={handleCloseEditDialog}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth variant="filled" margin="normal">
                        <InputLabel>Producto</InputLabel>
                        <Select
                            name="product"
                            value={form.idProduct}  // Suponiendo que tienes un campo productId en tu formulario
                            onChange={(e) => setForm(Number(e.target.value), "idProduct")}  // Actualiza el estado con el valor seleccionado
                            label="Producto"
                            required
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.nombre} {/* Asumiendo que el producto tiene un nombre y un id */}
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
                            value={form.idLocal}  // Suponiendo que tienes un campo productId en tu formulario
                            onChange={(e) => setForm(Number(e.target.value), "idLocal")}  // Actualiza el estado con el valor seleccionado
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