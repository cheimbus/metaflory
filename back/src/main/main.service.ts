import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { ProductAuthor } from 'src/entitis/Product.author';

@Injectable()
export class MainService {
  constructor(private configService: ConfigService) {}
  async getAuthorListForMain(): Promise<any> {
    const getAuthorList = await dataSource.manager
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
    const sliceSortedInfo = sortedInfo.slice(0, 3);
    return sliceSortedInfo;
  }

  // async getPresentListForMain(): Promise<any> {}
}
