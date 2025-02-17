import { Box, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { FormDialog } from "../../../ui/Dialog/FormDialog";
import { useDialog } from "../../../hooks/useDialog";
import { initialAppProduct } from "../../../state/initialStates";
import { useProduct } from "../../../hooks/useProduct";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { ProductDTO } from "../../../data/DTOs/ProductDTO";

interface ProductEditProps {
  setStateForm: (value: ProductDTO) => void;
  form: ProductDTO;
  setForm: <K extends keyof ProductDTO>(value: ProductDTO[K], field: K) => void;
}

export const ProductEdit = ({
  setStateForm,
  form,
  setForm,
}: ProductEditProps) => {
  const { openEditDialog, handleCloseEditDialog } = useDialog();
  const { putAsync } = useProduct();

  const handleSubmit = () => {
    putAsync(form)
      .then((res) => {
        inventoryAlert(res);
        setStateForm({ ...initialAppProduct });
      })
      .catch((e) =>
        inventoryAlert(e.response?.data.message ?? "Unexpected error")
      );
  };

  return (
    <FormDialog
      openDialog={openEditDialog}
      handleDialog={handleCloseEditDialog}
      title={"Editar producto"}
      handleSubmit={handleSubmit}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          label="Código de Barras"
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
          value={form.expiryDate ? form.expiryDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setForm(new Date(e.target.value), "expiryDate")}
        />
      </Box>
    </FormDialog>
  );
};