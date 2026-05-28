export declare class OrderItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    notes?: string;
}
export declare class UpdateOrderStatusDto {
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}
