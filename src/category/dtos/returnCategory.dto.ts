import { ProductEntity } from "src/product/entities/product.entity";
import { CategoryEntity } from "../entities/category.entity";

export class ReturnCategoryDto {
    id: number;
    name: string;
    created_at: Date
    products: ProductEntity[]

    constructor(categoryEntity: CategoryEntity) {
        this.id = categoryEntity.id;
        this.name = categoryEntity.name;
        this.created_at = categoryEntity.createdAt;
        this.products = categoryEntity.products;
    }
}