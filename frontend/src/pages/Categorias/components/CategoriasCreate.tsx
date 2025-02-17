import { Box, Button, TextField } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { useForm } from "../../../hooks/useForm";
import { useCategorias } from "../../../hooks/useCategorias";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { initialAppCategorias } from "../../../state/initialStates";

export const CategoriasCreate = () => {
    const { openCreateDialog, handleOpenCreateDialog, handleCloseCreateDialog } = useDialog();
    const { form, setForm, setStateForm } = useForm({ ...initialAppCategorias });
    const { postAsync } = useCategorias();

    const handleSubmit = () => {
        postAsync(form)
            .then(res => {
                inventoryAlert(res);
                setStateForm({ ...initialAppCategorias });
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
                    Crear categoría
                </Button>
            </Box>

            <FormDialog
                title={"Crear categoría"}
                handleSubmit={handleSubmit}
                openDialog={openCreateDialog}
                handleDialog={handleCloseCreateDialog}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        variant="filled"
                        fullWidth
                        label="Nombre"
                        placeholder="ej: Medicinas"
                        value={form.nombre}
                        onChange={e => setForm(e.target.value, "nombre")}
                        required
                    />

                    {/* <TextField
                        variant="filled"
                        fullWidth
                        label="ID Local"
                        placeholder="ej: 1"
                        type="number"
                        value={form.idLocal}
                        onChange={e => setForm(Number(e.target.value), "idLocal")}
                        required
                    /> */}
                </Box>
            </FormDialog>
        </>
    );
};
