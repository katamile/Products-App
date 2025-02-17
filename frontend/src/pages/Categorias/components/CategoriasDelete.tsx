import { IconButton, Paper } from "@mui/material";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import DeleteIcon from '@mui/icons-material/Delete';

export const UserDelete = () => {
  const handleClick = () => {
    const userConfirmed = inventoryAlert("¿Desea eliminar esta sucursal?");
    if (userConfirmed) {
      inventoryAlert("Sucursal eliminado.");
    }
  };

  return (
    <Paper sx={{ marginBottom: 6, width: 40, height:40, padding: 0, textAlign:"center" }}>
      <IconButton onClick={handleClick} color="error">
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};
