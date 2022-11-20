import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Category } from 'src/entitis/Category';
import { Product } from 'src/entitis/Product';
import { ProductAuthor } from 'src/entitis/Product.author';
import { ProductCategoryList } from 'src/entitis/Product.category.list';

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
  category: string;
  constructor(private configService: ConfigService) {
    this.author = '';
    this.name = '';
    this.price;
    this.content = '';
    this.flowerLanguage = '';
    this.quantityMax;
    this.quantityNow;
    this.imagePath = '';
    this.category = '';
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
    this.price = parseInt(data.data.price);
    this.content = data.data.content;
    this.flowerLanguage = data.data.flowerLanguage;
    this.quantityMax = parseInt(data.data.quantityMax);
    this.imagePath = stringifiedImagePath;
    this.category = data.data.category;
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
      const existAuthor = await dataSource.manager
        .getRepository(ProductAuthor)
        .createQueryBuilder()
        .where('name=:name', { name: this.author })
        .getOne();
      const existCategory = await dataSource.manager
        .getRepository(Category)
        .createQueryBuilder()
        .where('name=:name', { name: this.category })
        .getOne();
      const product = new Product();
      product.authorId = existAuthor.id;
      product.category = this.category;
      product.name = this.name;
      product.price = this.price;
      product.content = this.content;
      product.flowerLanguage = this.flowerLanguage;
      product.quantityMax = this.quantityMax;
      product.quantityNow = this.quantityMax;
      product.imagePath = this.imagePath;
      const createProduct = await queryRunner.manager
        .getRepository(Product)
        .save(product);
      const productCategoryList = new ProductCategoryList();
      productCategoryList.productId = createProduct.id;
      productCategoryList.categoryId = existCategory.id;
      await queryRunner.manager
        .getRepository(ProductCategoryList)
        .save(productCategoryList);
      await queryRunner.commitTransaction();
      return {
        author: this.author,
        name: this.name,
        category: this.category,
        price: this.price,
        content: this.content,
        flowerLanguage: this.flowerLanguage,
        quantityMax: this.quantityMax,
        quantityNow: this.quantityNow,
        imagePath: filesNames,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 뷰 (관리자)
  async getOneProductToAdmin(name: string) {
    const productInfo = await dataSource.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name=:name', { name })
      .andWhere('product.isDeleted=:isDeleted', { isDeleted: false })
      .getOne();
    if (!productInfo) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    const parsedImagePath = JSON.parse(productInfo.imagePath);
    const authorInfo = await dataSource.manager
      .getRepository(ProductAuthor)
      .createQueryBuilder()
      .where('id=:id', { id: productInfo.authorId })
      .getOne();
    return {
      id: productInfo.id,
      author: authorInfo.name,
      isSoldout: productInfo.isSoldout,
      name: productInfo.name,
      price: productInfo.price,
      content: productInfo.content,
      category: productInfo.category,
      flowerLanguage: productInfo.flowerLanguage,
      quantityMax: productInfo.quantityMax,
      quantityNow: productInfo.quantityNow,
      imagePath: parsedImagePath,
    };
  }

  // 상품 목록(관리자)
  // 첫번째 등록한 이미지가 대표이미지가 됨
  async getAllProductToAdmin() {
    const getProductInfos = await dataSource.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.isDeleted=:isDeleted', { isDeleted: false })
      .getMany();
    if (!getProductInfos) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    const productInfos = [];
    for (let i = 0; i < getProductInfos.length; i++) {
      const parsedImage = JSON.parse(getProductInfos[i].imagePath);
      productInfos.push({
        id: getProductInfos[i].id,
        imagePath: `${parsedImage[0]}`,
        name: getProductInfos[i].name,
        price: getProductInfos[i].price,
        category: getProductInfos[i].category,
        isSoldout: getProductInfos[i].isSoldout,
      });
    }
    return productInfos;
  }

  // 상품 수정하기 전 원래있던 내용 가져오기 (관리자)
  async getProductInfoBeforeModify(_name: string) {
    const {
      author,
      name,
      price,
      category,
      content,
      flowerLanguage,
      quantityMax,
      imagePath,
    } = await this.getOneProductToAdmin(_name);

    this.author = author;
    this.name = name;
    this.price = price;
    this.category = category;
    this.content = content;
    this.flowerLanguage = flowerLanguage;
    this.quantityMax = quantityMax;
    this.imagePath = imagePath;
    return {
      author,
      category,
      name,
      price,
      content,
      flowerLanguage,
      quantityMax,
      imagePath,
    };
  }

  // 상품 수정 (관리자)
  async modifyProductInfo(
    data,
    files: Express.Multer.File[],
    _name: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
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
      this.category = `${
        data.data.category === undefined ? this.category : data.data.category
      }`;
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
          category: this.category,
          content: this.content,
          flowerLanguage: this.flowerLanguage,
          quantityMax: this.quantityMax,
          imagePath: this.imagePath,
        })
        .where('name=:name', { name: _name })
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 삭제 soft delete (관리자)
  async deleteProduct(_name: string): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const exist = await dataSource.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name=:name', { name: _name })
      .andWhere('product.isDeleted=:isDeleted', { isDeleted: false })
      .getOne();
    if (!exist) {
      throw new BadRequestException('존재하지 않습니다.');
    }
    try {
      await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({ isDeleted: true })
        .where('name=:name', { name: _name })
        .execute();
      await dataSource.manager
        .getRepository(Product)
        .createQueryBuilder()
        .softDelete()
        .where('name=:name', { name: _name })
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 복구 (관리자)
  async restoreProduct(_name: string): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({ isDeleted: false })
        .where('name=:name', { name: _name })
        .execute();
      await dataSource.manager
        .getRepository(Product)
        .createQueryBuilder()
        .restore()
        .where('name=:name', { name: _name })
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
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const productInfo = await queryRunner.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name=:name', { name })
      .leftJoinAndSelect('product.AuthorId', 'productAuthor')
      .getOne();
    if (!productInfo) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const getHits = productInfo.AuthorId.hits + 1;
      const getViewHits = productInfo.hits + 1;
      await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({ hits: getViewHits })
        .where('hits=:hits', { hits: productInfo.hits })
        .andWhere('name=:name', { name: productInfo.name })
        .execute();
      await dataSource
        .createQueryBuilder()
        .update(ProductAuthor)
        .set({ hits: getHits })
        .where('name=:name', { name: productInfo.AuthorId.name })
        .execute();
      const parsedImagePath = JSON.parse(productInfo.imagePath);
      await queryRunner.commitTransaction();
      return {
        author: productInfo.AuthorId.name,
        isSoldout: productInfo.isSoldout,
        name: productInfo.name,
        category: productInfo.category,
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

  // 상품 목록 (사용자)
  async getAllProductForuser(): Promise<any> {
    const getProductInfos = await dataSource.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.isDeleted=:isDeleted', { isDeleted: false })
      .getMany();
    if (!getProductInfos) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    const productInfos = [];
    for (let i = 0; i < getProductInfos.length; i++) {
      const parsedImagePath = JSON.parse(getProductInfos[i].imagePath);
      productInfos.push({
        id: getProductInfos[i].id,
        imagePath: parsedImagePath[0],
        name: getProductInfos[i].name,
        price: getProductInfos[i].price,
        category: getProductInfos[i].category,
        isSoldout: getProductInfos[i].isSoldout,
      });
    }
    return productInfos;
  }
}
