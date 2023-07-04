import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "src/category/category.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { ProductEntity } from "./entities/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [CategoryModule, CloudinaryModule, TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})

export class ProductModule {}