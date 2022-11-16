import { Injectable } from '@nestjs/common';
import dataSource from 'datasource';
import { Product_author } from 'src/entitis/Product.author';

@Injectable()
export class MainService {
  async getAuthorListForMain(): Promise<any> {
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
      const sliceSortedInfo = sortedInfo.slice(0, 3);
      await queryRunner.commitTransaction();
      return sliceSortedInfo;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
