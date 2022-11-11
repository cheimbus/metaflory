import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Product } from 'src/entitis/Product';

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
  async createProduct(data, files: Express.Multer.File[]): Promise<any> {
    const filesNames = [];
    for (let i = 0; i < files.length; i++) {
      filesNames.push(
        `${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_COMMON_PATH')
            : this.configService.get('COMMON_PATH')
        }${files[i].filename}`,
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
          `${
            this.configService.get('TEST') === 'true'
              ? this.configService.get('TEST_COMMON_PATH')
              : this.configService.get('COMMON_PATH')
          }${files[i].filename}`,
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
  async getOneProductToAdmin(id: number) {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const productInfo = await queryRunner.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.id=:id', { id })
      .andWhere('product.isDeleted=:isDeleted', { isDeleted: false })
      .getOne();
    if (!productInfo) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const parsedImagePath = JSON.parse(productInfo.imagePath);
      await queryRunner.commitTransaction();
      return {
        author: productInfo.author,
        isSoldout: productInfo.isSoldout,
        name: productInfo.name,
        price: productInfo.price,
        content: productInfo.content,
        flowerLanguage: productInfo.flowerLanguage,
        quantityMax: productInfo.quantityMax,
        quantityNow: productInfo.quantityNow,
        imagePath: parsedImagePath,
        getCurrentProductInfoUri: `GET/ ${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_PRODUCT_PATH')
            : this.configService.get('PRODUCT_PATH')
        }${id}/${this.configService.get('ADMIN_PATH')}/mo`,
        deleteProductUri: `POST/ ${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_PRODUCT_PATH')
            : this.configService.get('PRODUCT_PATH')
        }${id}/${this.configService.get('ADMIN_PATH')}de`,
        restoreProductUri: `POST/ ${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_PRODUCT_PATH')
            : this.configService.get('PRODUCT_PATH')
        }${id}/${this.configService.get('ADMIN_PATH')}re`,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 목록(관리자)
  // 첫번째 등록한 이미지가 대표이미지가 됨
  async getAllProductToAdmin() {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const getProductInfos = await queryRunner.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.isDeleted=:isDeleted', { isDeleted: false })
      .getMany();
    if (!getProductInfos) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const productInfos = [];
      for (let i = 0; i < getProductInfos.length; i++) {
        const parsedImage = JSON.parse(getProductInfos[i].imagePath);
        productInfos.push({
          viewUri: `GET/ ${
            this.configService.get('TEST') === 'true'
              ? this.configService.get('TEST_PRODUCT_PATH')
              : this.configService.get('PRODUCT_PATH')
          }${getProductInfos[i].id}/${this.configService.get('ADMIN_PATH')}`,
          imagePath: `${parsedImage[0]}`,
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

  async getProductInfoBeforeModify(id: number) {
    const {
      author,
      name,
      price,
      content,
      flowerLanguage,
      quantityMax,
      imagePath,
    } = await this.getOneProductToAdmin(id);

    this.author = author;
    this.name = name;
    this.price = price;
    this.content = content;
    this.flowerLanguage = flowerLanguage;
    this.quantityMax = quantityMax;
    this.imagePath = imagePath;
    const productUrl = `POST/ ${
      this.configService.get('TEST') === 'true'
        ? this.configService.get('TEST_PRODUCT_PATH')
        : this.configService.get('PRODUCT_PATH')
    }${id}/${this.configService.get('ADMIN_PATH')}/mo`;
    return {
      author,
      name,
      price,
      content,
      flowerLanguage,
      quantityMax,
      imagePath,
      modifyUrl: productUrl,
    };
  }

  async modifyProductInfo(
    data,
    files: Express.Multer.File[],
    id: number,
  ): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const filesNames = [];
      if (files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          filesNames.push(
            `${
              this.configService.get('TEST') === 'true'
                ? this.configService.get('TEST_COMMON_PATH')
                : this.configService.get('COMMON_PATH')
            }${files[i].filename}`,
          );
        }
      }
      const stringifiedImagePath = JSON.stringify(filesNames);
      this.author = `${
        data.data.author === undefined ? this.author : data.data.author
      }`;
      this.name = `${
        data.data.name === undefined ? this.name : data.data.name
      }`;
      this.price = parseInt(
        `${data.data.price === undefined ? this.price : data.data.price}`,
      );
      this.content = `${
        data.data.content === undefined ? this.content : data.data.content
      }`;
      this.flowerLanguage = `${
        data.data.flowerLanguage === undefined
          ? this.flowerLanguage
          : data.data.flowerLanguage
      }`;
      this.quantityMax = parseInt(
        `${
          data.data.quantityMax === undefined
            ? this.quantityMax
            : data.data.quantityMax
        }`,
      );
      this.imagePath = `${
        files.length === 0 ? this.imagePath : stringifiedImagePath
      }`;
      await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({
          author: this.author,
          name: this.name,
          price: this.price,
          content: this.content,
          flowerLanguage: this.flowerLanguage,
          quantityMax: this.quantityMax,
          imagePath: this.imagePath,
        })
        .where('id=:id', { id })
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteProduct(id: number): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({ isDeleted: true })
        .where('id = :id', { id })
        .execute();
      await dataSource.manager
        .getRepository(Product)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async restoreProduct(id: number): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({ isDeleted: false })
        .where('id = :id', { id })
        .execute();
      await dataSource.manager
        .getRepository(Product)
        .createQueryBuilder()
        .restore()
        .where('id = :id', { id })
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 뷰 (사용자)
  async getOneProductForUser(name: string): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const productInfo = await queryRunner.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name=:name', { name })
      .andWhere('product.isDeleted=:isDeleted', { isDeleted: false })
      .getOne();
    if (!productInfo) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const parsedImagePath = JSON.parse(productInfo.imagePath);
      await queryRunner.commitTransaction();
      return {
        author: productInfo.author,
        isSoldout: productInfo.isSoldout,
        name: productInfo.name,
        price: productInfo.price,
        content: productInfo.content,
        flowerLanguage: productInfo.flowerLanguage,
        quantityMax: productInfo.quantityMax,
        quantityNow: productInfo.quantityMax,
        imagePath: parsedImagePath,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAllProductForuser(): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const getProductInfos = await dataSource.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.isDeleted=:isDeleted', { isDeleted: false })
      .getMany();
    if (!getProductInfos) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const productInfos = [];
      for (let i = 0; i < getProductInfos.length; i++) {
        const parsedImagePath = JSON.parse(getProductInfos[i].imagePath);
        productInfos.push({
          viewUri: `${
            this.configService.get('TEST') === 'true'
              ? this.configService.get('TEST_PRODUCT_PATH')
              : this.configService.get('PRODUCT_PATH')
          }${getProductInfos[i].id}`,
          imagePath: parsedImagePath[0],
          name: getProductInfos[i].name,
          price: getProductInfos[i].price,
          isSoldout: getProductInfos[i].isSoldout,
        });
      }
      await queryRunner.commitTransaction();
      return productInfos;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
