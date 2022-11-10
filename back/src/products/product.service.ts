import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Product } from 'src/entitis/Product';
import { User } from 'src/entitis/User';

/**
 * 사용자에게만 보여줄 상품정보, 관리자에게만 보여줄 상품정보 나눠서 개발
 */
@Injectable()
export class ProductService {
  author: string;
  name: string;
  price: number;
  content: string;
  flowerLanguage: string;
  quantityMax: number;
  quantityNow: number;
  imagePath: string;
  constructor(private configService: ConfigService) {
    this.author = '';
    this.name = '';
    this.price;
    this.content = '';
    this.flowerLanguage = '';
    this.quantityMax;
    this.quantityNow;
    this.imagePath = '';
  }
  async createProduct(
    data,
    files: Express.Multer.File[],
    user: string,
  ): Promise<any> {
    const filesNames = [];
    for (let i = 0; i < files.length; i++) {
      filesNames.push(
        `${this.configService.get('COMMON_PATH')}${files[i].filename}`,
      );
    }
    // db에서 꺼내서 사용할 때는 JSON.parse를 해준다.
    const stringifiedImagePath = JSON.stringify(filesNames);
    this.author = data.data.author;
    this.name = data.data.name;
    this.price = data.data.price;
    this.content = data.data.content;
    this.flowerLanguage = data.data.flowerLanguage;
    this.quantityMax = data.data.quantityMax;
    this.imagePath = stringifiedImagePath;
    const exist = await dataSource
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name=:name', { name: this.name })
      .getOne();
    if (exist) {
      throw new BadRequestException('이미 존재합니다.');
    }
    const isAdmin = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.name=:name', { name: this.configService.get('ADMIN_NAME') })
      .getOne();
    if (user !== isAdmin.name) {
      throw new ForbiddenException('접근할 수 없습니다.');
    }
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const product = new Product();
      product.author = this.author;
      product.name = this.name;
      product.price = this.price;
      product.content = this.content;
      product.flowerLanguage = this.flowerLanguage;
      product.quantityMax = this.quantityMax;
      product.quantityNow = this.quantityMax;
      product.imagePath = this.imagePath;
      await queryRunner.manager.getRepository(Product).save(product);
      const imageInfos = [];
      for (let i = 0; i < files.length; i++) {
        imageInfos.push(
          `${this.configService.get('COMMON_PATH')}${files[i].filename}`,
        );
      }
      await queryRunner.commitTransaction();
      return {
        author: this.author,
        name: this.name,
        price: this.price,
        content: this.content,
        flowerLanguage: this.flowerLanguage,
        quantityMax: this.quantityMax,
        quantityNow: this.quantityNow,
        imagePath: imageInfos,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 뷰 (관리자)
  async getOneProductToAdmin(id: number, user: string) {
    const queryRunner = await dataSource.createQueryRunner();
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
      const isAdmin = await queryRunner.manager
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.name=:name', {
          name: this.configService.get('ADMIN_NAME'),
        })
        .getOne();
      if (user !== isAdmin.name) {
        throw new ForbiddenException('접근할 수 없습니다.');
      }
      const parsedImagePath = JSON.parse(productInfo.imagePath);
      await queryRunner.commitTransaction();
      return {
        author: productInfo.author,
        isSoldout: productInfo.isSoldout,
        name: productInfo.name,
        price: productInfo.price,
        content: productInfo.content,
        flowerLagnuage: productInfo.flowerLanguage,
        quantityMax: productInfo.quantityMax,
        quantityNow: productInfo.quantityNow,
        imagePath: parsedImagePath,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 목록(관리자)
  async getAllProductToAdmin(user: string) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const isAdmin = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.name=:name', {
        name: this.configService.get('ADMIN_NAME'),
      })
      .getOne();
    if (user !== isAdmin.name) {
      throw new ForbiddenException('접근할 수 없습니다.');
    }
    const getProductInfos = await queryRunner.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .getMany();
    if (!getProductInfos) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const productInfos = [];
      for (let i = 0; i < getProductInfos.length; i++) {
        await queryRunner.manager
          .getRepository(Product)
          .createQueryBuilder('product');
        productInfos.push({
          url: `${this.configService.get('ADMIN_PATH')}${
            getProductInfos[i].id
          }`,
          name: getProductInfos[i].name,
          price: getProductInfos[i].price,
          isSoldout: getProductInfos[i].isSoldout,
        });
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
