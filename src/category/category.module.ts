import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryEntity } from "./entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [CategoryService]
})

export class CategoryModule {}