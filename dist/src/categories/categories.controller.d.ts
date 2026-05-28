import { CategoriesService } from './categories.service.js';
export declare class CategoriesController {
    private categories;
    constructor(categories: CategoriesService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }[]>;
}
