import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Product } from "../../../data/Entities/Product";
import { useDialog } from "../../../hooks/useDialog";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useProduct } from "../../../hooks/useProduct";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import { LocalesDTO } from "../../../data/DTOs/LocalesDTO";
import { CategoriasDTO } from "../../../data/DTOs/CategoriasDTO";

interface ProductTableViewProps {
  rows: Product[];
  setStateForm: (value: Product) => void;
  locales: LocalesDTO[];
  categorias: CategoriasDTO[];
}

export const ProductTableView = ({
  rows,
  setStateForm,
  locales,
  categorias,
}: ProductTableViewProps) => {
  const { handleOpenEditDialog, handleOpenDeleteDialog } = useDialog();
  const { deleteAsync, getAsync } = useProduct();

  const handleClickEdit = (id: number) => {
    getAsync(id)
      .then((res) => {
        setStateForm(res);
        handleOpenEditDialog();
      })
      .catch((err) => {
        inventoryAlert(err.response?.data?.message ?? "Unexpected error");
      });
  };

  const handleClickDelete = (id: number) => {
    deleteAsync(id)
      .then((res) => {
        inventoryAlert(res);
      })
      .catch((err) => {
        inventoryAlert(err.response?.data?.message ?? "Unexpected error");
      })
      .finally(() => {
        handleOpenDeleteDialog();
      });
  };

  // Función de columnas con acceso a los locales
  const columns = [
    {
      field: "idLocal",
      headerName: "Local",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const local = locales.find((local) => local.id === params.value); // Buscar el nombre del local
        return local ? local.nombre : "Local no encontrado"; // Mostrar nombre del local o un mensaje si no se encuentra
      },
    },
    {
      field: "idCategoria",
      headerName: "Categoria",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const categoria = categorias.find((categoria) => categoria.id === params.value); // Buscar el nombre del local
        return categoria ? categoria.nombre : "Local no encontrado"; // Mostrar nombre del local o un mensaje si no se encuentra
      },
    },
    { field: "nombre", headerName: "Nombres", width: 150 },
    { field: "codigoBarra", headerName: "Código", width: 300 },
    { field: "price", headerName: "Precio", width: 150 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "description", headerName: "Descripcion", width: 300 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
        >
          <IconButton
            onClick={() => {
              handleClickDelete(Number(params["id"]));
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflow: "auto",
      }}
    >
      <div style={{ flex: 1, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          sx={{ minHeight: 300 }}
        />
      </div>
    </Box>
  );
};