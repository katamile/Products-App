export type Transacciones = {
    id: number;
    totalProductos: number;
    totalPrecio: string; 
    tipoTransaccion: string;
    status: string;
    description?: string; 
    updatedAt: Date; 
    createdAt: Date;
    user: number;
    product: number;
    local: number;
};

export type TransaccionRequest = {
    idProduct: number;
    quantity: number;
    description: string;
    idLocal: number;
};