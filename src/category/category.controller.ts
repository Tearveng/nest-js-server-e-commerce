import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { ReturnCategoryDto } from "./dtos/returnCategory.dto";
import { CategoryEntity } from "./entities/category.entity";


@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createCategory: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory);
    }

    @Get('/all')
    async getAllCategories(): Promise<CategoryEntity[]> {
        return await this.categoryService.getAllCategories();
    }
    
    @Get('/:categoryId')
    async findCategoryById(@Param('categoryId') categoryId: number): Promise<ReturnCategoryDto> {
        const category = await this.categoryService.findCategoryById(categoryId);

        return new ReturnCategoryDto(category);
    }
    
}