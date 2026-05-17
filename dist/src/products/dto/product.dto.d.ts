export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: string;
    imageUrl?: string;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
    isActive?: boolean;
}
