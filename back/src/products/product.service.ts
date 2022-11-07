import { BadRequestException, Injectable } from '@nestjs/common';
import dataSource from 'datasource';
import { Product } from 'src/entitis/Product';

/**
 * name, price, content, flower_language, quantity_max, quantity_now, image_path
상품 목록에서는 name, price, quantity_now
상품 뷰에서는 전부
 */
@Injectable()
export class ProductService {
  name: string;
  price: number;
  content: string;
  flowerLanguage: string;
  quantityMax: number;
  quantityNow: number;
  imagePath: string;
  constructor() {
    this.name = '';
    this.price;
    this.content = '';
    this.flowerLanguage = '';
    this.quantityMax;
    this.quantityNow;
    this.imagePath = '';
  }
  async createProduct(data): Promise<any> {
    this.name = data.data.name;
    this.price = data.data.price;
    this.content = data.data.content;
    this.flowerLanguage = data.data.flowerLanguage;
    this.quantityMax = data.data.quantityMax;
    this.quantityNow = data.data.quantityNow;
    this.imagePath = data.data.imagePath;
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const product = new Product();
      product.name = this.name;
      product.price = this.price;
      product.content = this.content;
      product.flowerLanguage = this.flowerLanguage;
      product.quantityMax = this.quantityMax;
      product.quantityNow = this.quantityNow;
      product.imagePath = this.imagePath;
      await queryRunner.manager.getRepository(Product).save(product);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getOneProduct(id: number) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productInfo = await queryRunner.manager
        .getRepository(Product)
        .createQueryBuilder('product')
        .where('product.id=:id', { id })
        .getOne();
      if (!productInfo) {
        throw new BadRequestException('해당 정보가 없습니다.');
      }
      await queryRunner.commitTransaction();
      return productInfo;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAllProduct() {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productInfos = await queryRunner.manager
        .getRepository(Product)
        .createQueryBuilder('product')
        .getMany();
      if (!productInfos) {
        throw new BadRequestException('해당 정보가 없습니다.');
      }
      await queryRunner.commitTransaction();
      return productInfos;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
