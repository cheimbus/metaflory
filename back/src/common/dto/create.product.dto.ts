import { PickType } from '@nestjs/swagger';
import { Product } from 'src/entitis/Product';

export class CreateProductDto extends PickType(Product, [
  'name',
  'price',
  'content',
  'quantityMax',
  'quantityNow',
  'imagePath',
] as const) {}
