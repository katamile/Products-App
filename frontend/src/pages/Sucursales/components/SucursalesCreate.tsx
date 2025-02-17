import { Box, Button, TextField } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { useForm } from "../../../hooks/useForm";
import { useLocales } from "../../../hooks/useLocales";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { initialAppLocales } from "../../../state/initialStates";

export const LocalesCreate = () => {
    const { openCreateDialog, handleOpenCreateDialog, handleCloseCreateDialog } = useDialog();
    const { form, setForm, setStateForm } = useForm({ ...initialAppLocales });
    const { postAsync } = useLocales();

    const handleSubmit = () => {
        postAsync(form)
            .then(res => {
                inventoryAlert(res);
                setStateForm({ ...initialAppLocales });
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
                    Crear sucursal
                </Button>
            </Box>

            <FormDialog
                title={"Crear sucursal"}
                handleSubmit={handleSubmit}
                openDialog={openCreateDialog}
                handleDialog={handleCloseCreateDialog}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        variant="filled"
                        fullWidth
                        label="Código"
                        placeholder="ej: SUC-001"
                        value={form.codigo}
                        onChange={e => setForm(e.target.value, "codigo")}
                        required
                    />

                    <TextField
                        variant="filled"
                        fullWidth
                        label="Nombre"
                        placeholder="ej: Sucursal Principal"
                        value={form.nombre}
                        onChange={e => setForm(e.target.value, "nombre")}
                        required
                    />

                    <TextField
                        variant="filled"
                        fullWidth
                        label="Dirección"
                        placeholder="ej: Av. Principal 123"
                        value={form.direccion}
                        onChange={e => setForm(e.target.value, "direccion")}
                        required
                    />

                    <TextField
                        variant="filled"
                        fullWidth
                        label="Ciudad"
                        placeholder="ej: Quito"
                        value={form.ciudad}
                        onChange={e => setForm(e.target.value, "ciudad")}
                        required
                    />

                    <TextField
                        variant="filled"
                        fullWidth
                        label="Provincia"
                        placeholder="ej: Pichincha"
                        value={form.provincia}
                        onChange={e => setForm(e.target.value, "provincia")}
                        required
                    />

                    <TextField
                        variant="filled"
                        fullWidth
                        label="Teléfono"
                        placeholder="ej: 022345678"
                        value={form.telefono}
                        onChange={e => setForm(e.target.value, "telefono")}
                        required
                    />
                </Box>
            </FormDialog>
        </>
    );
};