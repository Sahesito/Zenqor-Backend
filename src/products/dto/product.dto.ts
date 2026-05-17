import { IsString, IsNumber, IsOptional, IsBoolean, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    price!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    stock!: number;

    @IsString()
    categoryId!: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}