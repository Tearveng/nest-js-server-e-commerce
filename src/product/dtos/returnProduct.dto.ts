import { CategoryEntity } from "src/category/entities/category.entity";
import { ProductEntity } from "../entities/product.entity";

export class ReturnProductDto {
    id: number;
    name: string;
    description: string;
    oldPrice: number;
    newPrice: number;
    sku: string;
    categoryId: number;
    created_at: Date
    category:CategoryEntity;

    constructor(productEntity: ProductEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.description =productEntity.description;
        this.oldPrice = productEntity.oldPrice;
        this.newPrice = productEntity.newPrice;
        this.sku = productEntity.sku;
        this.categoryId = productEntity.category.id
        this.created_at = productEntity.createdAt;
        this.category = productEntity.category;
    }
}