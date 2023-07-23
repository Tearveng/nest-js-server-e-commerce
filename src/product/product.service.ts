import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // create product
  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    const product = await this.findProductBySku(createProductDto.sku).catch(
      () => undefined,
    );
    let secure_url: null | string = null;
    if (product) {
      throw new BadRequestException(
        'product with this SKU registered in system.',
      );
    }

    if (file) {
      try {
        const upload = await this.cloudinaryService.uploadImage(file);
        secure_url = upload.secure_url;
      } catch (error) {}
    }

    const category = await this.categoryService.findCategoryById(
      createProductDto.categoryId,
    );

    const saveProduct = this.productRepository.save({
      ...createProductDto,
    });
    (await saveProduct).category = category;
    (await saveProduct).image = secure_url;
    await this.productRepository.save(await saveProduct);

    return saveProduct;
  }

  // find product by sku
  async findProductBySku(sku: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { sku },
    });

    if (!product) {
      throw new NotFoundException(`Product sku: ${sku} Not Found`);
    }

    return product;
  }

  // delete product
  async deleteProduct(id: number): Promise<DeleteResult> {

    return await this.productRepository.delete({id});
  }

  // find product by id
  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product Not Found`);
    }

    return product;
  }

  // get all products
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateProduct(updateDto: UpdateProductDto, id: number): Promise<UpdateResult> {
    const { categoryId, ...rest } = updateDto;
    const category = await this.categoryService.findCategoryById(categoryId);

    return await this.productRepository.update(id, {...rest, category});
  }
}
