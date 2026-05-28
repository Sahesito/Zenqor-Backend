import { IsString, IsArray, IsNumber, IsOptional, ValidateNested, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
    @IsString()
    productId!: string;

    @IsNumber()
    @Min(1)
    quantity!: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items!: OrderItemDto[];

    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateOrderStatusDto {
    @IsString()
    status!: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}