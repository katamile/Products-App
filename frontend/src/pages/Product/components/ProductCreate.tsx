import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { initialAppProduct } from "../../../state/initialStates";
import { useForm } from "../../../hooks/useForm";
import { useProduct } from "../../../hooks/useProduct";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { LocalesDTO } from "../../../data/DTOs/LocalesDTO";
import { CategoriasDTO } from "../../../data/DTOs/CategoriasDTO";

interface ProductCreateProps {
  locales: LocalesDTO[];
  categorias: CategoriasDTO[];
}
export const ProductCreate = ({locales, categorias} : ProductCreateProps) => {
  const { openCreateDialog, handleOpenCreateDialog, handleCloseCreateDialog } =
    useDialog();
  const { form, setForm, setStateForm } = useForm({ ...initialAppProduct });
  const { postAsync } = useProduct();

  const handleSubmit = () => {
    postAsync(form)
      .then((res) => {
        inventoryAlert(res);
        setStateForm({ ...initialAppProduct });
        window.location.reload();
      })
      .catch((e) =>
        inventoryAlert(e.response?.data.message ?? "Unexpected error")
      );
  };

  return (
    <>
      <Box
        sx={{ marginBottom: 6, display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={handleOpenCreateDialog}
          variant="contained"
          size="small"
          sx={{
            fontSize: "0.75rem",
            padding: "4px 8px",
            width: "15%",
            height: 40,
          }}
        >
          Crear producto
        </Button>
      </Box>

      <FormDialog
        title="Crear producto"
        handleSubmit={handleSubmit}
        openDialog={openCreateDialog}
        handleDialog={handleCloseCreateDialog}
        maxWidth="sm"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          <FormControl fullWidth variant="filled" margin="normal">
              <InputLabel>Categoria</InputLabel>
              <Select
                  name="categoria"
                  value={form.idCategoria}  // Suponiendo que tienes un campo productId en tu formulario
                  onChange={(e) => setForm(Number(e.target.value), "idCategoria")}  // Actualiza el estado con el valor seleccionado
                  label="Categoria"
                  required
              >
                  {categorias.map((categoria) => (
                      <MenuItem key={categoria.id} value={categoria.id}>
                          {categoria.nombre} 
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
          <TextField
            variant="filled"
            fullWidth
            name="nombre"
            label="Nombre"
            placeholder="ej: Producto123"
            required
            value={form.nombre}
            onChange={(e) => setForm(e.target.value, "nombre")}
        />
        <TextField
            variant="filled"
            fullWidth
            name="description"
            label="Descripción"
            placeholder="ej: Descripción del producto"
            required
            value={form.description}
            onChange={(e) => setForm(e.target.value, "description")}
        />
        <TextField
            variant="filled"
            fullWidth
            name="codigoBarra"
            label="Código de barras"
            placeholder="ej: 123456789"
            required
            value={form.codigoBarra}
            onChange={(e) => setForm(e.target.value, "codigoBarra")}
        />
        <TextField
            variant="filled"
            fullWidth
            type="number"
            name="price"
            label="Precio"
            placeholder="ej: 50.00"
            required
            value={form.price}
            onChange={(e) => setForm(Number(e.target.value), "price")}
        />
        <TextField
            variant="filled"
            fullWidth
            type="number"
            name="stock"
            label="Stock"
            placeholder="ej: 100"
            required
            value={form.stock}
            onChange={(e) => setForm(Number(e.target.value), "stock")}
        />
        <TextField
            variant="filled"
            fullWidth
            type="date"
            name="expiryDate"
            label="Fecha de Expiración"
            InputLabelProps={{ shrink: true }}
            required
            value={form.expiryDate.toISOString().split('T')[0]}
            onChange={(e) => setForm(new Date(e.target.value), "expiryDate")}
        />
        </Box>
      </FormDialog>
    </>
  );
};
