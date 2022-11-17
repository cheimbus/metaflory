import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Product_author } from 'src/entitis/Product.author';

@Injectable()
export class MainService {
  constructor(private configService: ConfigService) {}
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
          authorListUri: `${
            this.configService.get('TEST') === 'true'
              ? this.configService.get('TEST_COMMON_PATH')
              : this.configService.get('COMMON_PATH')
          }author/${sorted[i].name}/products`,
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
