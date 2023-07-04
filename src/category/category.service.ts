import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.findCategoryByName(
      createCategoryDto.name
    ).catch(() => undefined);
    if (category) {
      throw new BadRequestException('category registered in system.');
    }

    return this.categoryRepository.save({
      ...createCategoryDto,
    });
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {id},
      relations: ['products']
    });

    if (!category) {
      throw new NotFoundException(`Category Not Found`);
    }

    return category;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {name},
    });

    if (!category) {
      throw new NotFoundException(`Category: ${name} Not Found`);
    }

    return category;
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({relations: ['products']});
  }
}
