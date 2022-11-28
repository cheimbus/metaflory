import { BadRequestException, Injectable } from '@nestjs/common';
import dataSource from 'datasource';
import { ProductAuthor } from 'src/entitis/Product.author';

@Injectable()
export class AuthorService {
  async setAuthorInfo(
    files: Express.Multer.File[],
    data: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const imagePath = files[0].filename;
    const exist = await queryRunner.manager
      .getRepository(ProductAuthor)
      .createQueryBuilder('author')
      .where('author.name=:name', { name: data })
      .getOne();
    if (exist) throw new BadRequestException('이미 생성되었습니다.');
    try {
      const author = new ProductAuthor();
      author.name = data;
      author.imagePath = imagePath;
      await queryRunner.manager.getRepository(ProductAuthor).save(author);
      await queryRunner.commitTransaction();
      return {
        author: data,
        imagePath: imagePath,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAuthorList(): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const getAuthorList = await queryRunner.manager
        .getRepository(ProductAuthor)
        .createQueryBuilder()
        .getMany();
      const sortedInfo = [];
      const sorted = getAuthorList.sort((a, b) => {
        return b.hits - a.hits;
      });
      for (let i = 0; i < getAuthorList.length; i++) {
        sortedInfo.push({
          id: sorted[i].id,
          name: sorted[i].name,
          imagePath: sorted[i].imagePath,
        });
      }
      await queryRunner.commitTransaction();
      return sortedInfo;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAuthorProducts(name: string): Promise<any> {
    const products = await dataSource.manager
      .getRepository(ProductAuthor)
      .createQueryBuilder('author')
      .where('author.name=:name', { name })
      .leftJoinAndSelect('author.product', 'product')
      .getOne();
    const authorWithProducts = [];
    for (let i = 0; i < products.product.length; i++) {
      authorWithProducts.push({
        id: products.product[i].id,
        name: products.product[i].name,
        price: products.product[i].price,
        ImagePath: JSON.parse(products.product[i].imagePath)[0],
        isSoldout: products.product[i].isSoldout,
      });
      return authorWithProducts;
    }
  }
}
