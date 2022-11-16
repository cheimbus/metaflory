import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Product_author } from 'src/entitis/Product.author';

@Injectable()
export class AuthorService {
  constructor(private configService: ConfigService) {}

  async setAuthorInfo(
    files: Express.Multer.File[],
    data: string,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const imagePath = `${
      this.configService.get('TEST') === 'true'
        ? this.configService.get('TEST_COMMON_PATH')
        : this.configService.get('COMMON_PATH')
    }${files[0].filename}`;
    const exist = await queryRunner.manager
      .getRepository(Product_author)
      .createQueryBuilder('author')
      .where('author.name=:name', { name: data })
      .getOne();
    // 대표 이미지 변경
    if (exist) {
      await dataSource
        .createQueryBuilder()
        .update(Product_author)
        .set({ imagePath })
        .where('name=:name', { name: data })
        .execute();
      return {
        author: data,
        imagePath,
      };
    }
    try {
      const author = new Product_author();
      author.name = data;
      author.imagePath = imagePath;
      await queryRunner.manager.getRepository(Product_author).save(author);
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

  // 작가 조회수에 따라 순위 매김
  //
  async getAuthorList(): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const getAuthorList = await queryRunner.manager
        .getRepository(Product_author)
        .createQueryBuilder()
        .getMany();
      const sortedInfo = [];
      const sorted = getAuthorList.sort((a, b) => {
        return b.hits - a.hits;
      });
      for (let i = 0; i < getAuthorList.length; i++) {
        sortedInfo.push({
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
}
