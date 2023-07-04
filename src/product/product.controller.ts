import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dtos/createProduct.dto";
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
}