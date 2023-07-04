import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  image: string | null;

  @IsString()
  @ApiProperty()
  oldPrice: number;

  @IsString()
  @ApiProperty()
  newPrice: number;

  @IsString()
  @ApiProperty()
  sku: string;

  @IsString()
  @ApiProperty()
  categoryId: number

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
}
