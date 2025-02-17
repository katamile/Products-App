import { Box, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useDialog } from "../../../hooks/useDialog";
import { useCategorias } from "../../../hooks/useCategorias";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Categorias } from "../../../data/Entities/Categorias";

const columns = (handleClickEdit: (id: number) => void, handleClickDelete: (id: number) => void) => [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    // { field: "idLocal", headerName: "ID Local", width: 150 },
    {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        renderCell: (params: GridRenderCellParams) => (
            <ButtonGroup disableElevation variant="contained" aria-label="Acciones">
                <IconButton onClick={() => handleClickDelete(Number(params.id))} color="error">
                    <DeleteIcon />
                </IconButton>
            </ButtonGroup>
        ),
    },
];

interface CategoriasTableViewProps {
    rows: Categorias[];
    setStateForm: (value: Categorias) => void;
}

export const CategoriasTableView = ({ rows, setStateForm }: CategoriasTableViewProps) => {
    const { handleOpenEditDialog, handleOpenDeleteDialog } = useDialog();
    const { deleteAsync, getAsync } = useCategorias();

    const handleClickEdit = (id: number) => {
        getAsync(id)
            .then(categoria => {
                setStateForm(categoria);
                handleOpenEditDialog();
            })
            .catch((err) => {
                inventoryAlert(err.response?.data?.message ?? "Error inesperado");
            });
    };

    const handleClickDelete = (id: number) => {
        deleteAsync(id)
            .then(response => {
                inventoryAlert(response);
            })
            .catch((err) => {
                inventoryAlert(err.response?.data?.message ?? "Error inesperado");
            })
            .finally(() => {
                handleOpenDeleteDialog();
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'auto' }}>
            <div style={{ flex: 1, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns(handleClickEdit, handleClickDelete)}
                    autoHeight
                    sx={{ minHeight: 300 }}
                />
            </div>
        </Box>
    );
};
