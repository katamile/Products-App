import { Box, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useDialog } from "../../../hooks/useDialog";
import { useTransacciones } from "../../../hooks/useTransacciones";
import { inventoryAlert } from "../../../ui/Alert/InventoryAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Transacciones } from "../../../data/Entities/Transacciones";

const columns = () => [
    { field: "id", headerName: "ID", width: 100 },
    { field: "totalProductos", headerName: "Total Productos", width: 150 },
    { field: "totalPrecio", headerName: "Total Precio", width: 150 },
    { field: "tipoTransaccion", headerName: "Tipo", width: 150 },
    { field: "status", headerName: "Estado", width: 150 },
    { field: "createdAt", headerName: "Fecha Creación", width: 180 },
];

interface TransaccionesTableViewProps {
    rows: Transacciones[];
    setStateForm: (value: Transacciones) => void;
}

export const TransaccionesTableView = ({ rows, setStateForm }: TransaccionesTableViewProps) => {
    const { handleOpenEditDialog } = useDialog();
    const { getAsync } = useTransacciones();

    const handleClickEdit = (id: number) => {
        getAsync(id)
            .then(transaction => {
                setStateForm(transaction);
                handleOpenEditDialog();
            })
            .catch((err) => {
                inventoryAlert(err.response?.data?.message ?? "Error inesperado");
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'auto' }}>
            <div style={{ flex: 1, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns()}
                    autoHeight
                    sx={{ minHeight: 300 }}
                />
            </div>
        </Box>
    );
};
