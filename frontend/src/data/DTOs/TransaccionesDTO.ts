export type TransaccionesDTO = {
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

export type TransaccionRequestDTO = {
    idProduct: number;
    quantity: number;
    description: string;
    idLocal: number;
};