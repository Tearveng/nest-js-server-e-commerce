import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { ProductEntity } from "./entities/product.entity";
import { ProductService } from "./product.service";


@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@Body() createProduct: CreateProductDto, @UploadedFile() file: Express.Multer.File): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct, file);
    }

    @Get('/all')
    async getAllProducts(): Promise<ProductEntity[]> {
        const products = await this.productService.getAllProducts();

        return products
    }

    @Put('/update/:productId')
    async updateProduct(@Body() updateDto: UpdateProductDto, @Param('productId') productId: number): Promise<UpdateResult> {
        const product = await this.productService.updateProduct(updateDto, productId);

        return product;
    }

    @Delete('/delete/:productId')
    async deleteProduct(@Param('productId') productId: number): Promise<DeleteResult> {
       return await this.productService.deleteProduct(productId);
    }
}