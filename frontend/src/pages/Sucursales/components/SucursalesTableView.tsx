import { Box, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useDialog } from "../../../hooks/useDialog";
import { useLocales } from "../../../hooks/useLocales";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Locales } from "../../../data/Entities/Locales";

const columns = (handleClickEdit: (id: number) => void, handleClickDelete: (id: number) => void) => [
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "direccion", headerName: "Dirección", width: 150 },
    { field: "ciudad", headerName: "Ciudad", width: 150 },
    { field: "provincia", headerName: "Provincia", width: 150 },
    { field: "telefono", headerName: "Teléfono", width: 150 },
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

interface LocalesTableViewProps {
    rows: Locales[];
    setStateForm: (value: Locales) => void;
}

export const LocalesTableView = ({ rows, setStateForm }: LocalesTableViewProps) => {
    const { handleOpenEditDialog, handleOpenDeleteDialog } = useDialog();
    const { deleteAsync, getAsync } = useLocales();

    const handleClickEdit = (id: number) => {
        getAsync(id)
            .then(local => {
                setStateForm(local);
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