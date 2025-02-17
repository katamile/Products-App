import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { useForm } from "../../../hooks/useForm";
import { useUser } from "../../../hooks/useUser";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { PasswordTextField } from "../../Login/components/PasswordTextField";

const initialUserState = {
  nombre: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "VENDEDOR",
};

export const UserCreate = () => {
  const { openCreateDialog, handleOpenCreateDialog, handleCloseCreateDialog } = useDialog();
  const { form, setForm, setStateForm } = useForm({ ...initialUserState });
  const { postAsync } = useUser();

  const handleSubmit = () => {
    postAsync(form)
      .then(res => {
        inventoryAlert(res);
        setStateForm({ ...initialUserState });
        window.location.reload();
      })
      .catch(e => inventoryAlert(e.response?.data.message ?? "Unexpected error"));
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
          Crear usuario
        </Button>
      </Box>

      <FormDialog
        title={"Crear usuario"}
        handleSubmit={handleSubmit}
        openDialog={openCreateDialog}
        handleDialog={handleCloseCreateDialog}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            variant="filled"
            fullWidth
            label="Nombre completo"
            placeholder="ej: Milena Orellana"
            value={form.nombre}
            onChange={e => setForm(e.target.value, "nombre")}
            required
          />

          <TextField
            variant="filled"
            fullWidth
            label="Correo"
            placeholder="ej: usuario@ejemplo.com"
            value={form.email}
            onChange={e => setForm(e.target.value, "email")}
            required
          />

          <TextField
            variant="filled"
            fullWidth
            label="Número de teléfono"
            placeholder="ej: 0958702590"
            value={form.phoneNumber}
            onChange={e => setForm(e.target.value, "phoneNumber")}
            required
          />

          <PasswordTextField
            name="Contraseña"
            value={form.password}
            onChange={e => setForm(e.target.value, "password")}
          />
        </Box>
      </FormDialog>
    </>
  );
};
