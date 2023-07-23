import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @ApiProperty()
  name: string;


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
  categoryId: number;
}
