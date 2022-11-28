import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Category } from 'src/entitis/Category';
import { Product } from 'src/entitis/Product';
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
        imagePath: `${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_COMMON_PATH')
            : this.configService.get('COMMON_PATH')
        }${sorted[i].imagePath}`,
      });
    }
    const sliceSortedInfo = sortedInfo.slice(0, 3);
    return sliceSortedInfo;
  }

  async getNewProductListForMain(category: string): Promise<any> {
    const orderByDate = await dataSource
      .createQueryBuilder(Product, 'product')
      .orderBy('product.createdAt', 'DESC')
      .getManyAndCount();
    const categoryInfo = await dataSource
      .createQueryBuilder(Category, 'category')
      .where('category.name=:name', { name: category })
      .getOne();
    const orderByDateArray = [];
    for (let i = 0; i < orderByDate[1]; i++) {
      const parsedImage = JSON.parse(orderByDate[0][i].imagePath);
      orderByDateArray.push({
        imagePath: `${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_COMMON_PATH')
            : this.configService.get('COMMON_PATH')
        }${parsedImage}`,
        name: orderByDate[0][i].name,
        price: orderByDate[0][i].price,
        category,
      });
    }
    const sliceOrderByDate = orderByDateArray.slice(0, 3);
    return {
      category,
      categoryContent: categoryInfo.content,
      productInfoForMain: sliceOrderByDate,
    };
  }

  async getPopularProductListForMain(category: string): Promise<any> {
    const orderByHits = await dataSource
      .createQueryBuilder(Product, 'product')
      .orderBy('product.hits', 'DESC')
      .getManyAndCount();
    const categoryInfo = await dataSource
      .createQueryBuilder(Category, 'category')
      .where('category.name=:name', { name: category })
      .getOne();
    const orderByHitsArray = [];
    for (let i = 0; i < orderByHits[1]; i++) {
      const parsedImage = JSON.parse(orderByHits[0][i].imagePath);
      orderByHitsArray.push({
        imagePath: `${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_COMMON_PATH')
            : this.configService.get('COMMON_PATH')
        }${parsedImage}`,
        name: orderByHits[0][i].name,
        price: orderByHits[0][i].price,
        category,
      });
    }
    const sliceOrderByHits = orderByHitsArray.slice(0, 3);
    return {
      category,
      categoryContent: categoryInfo.content,
      productInfoForMain: sliceOrderByHits,
    };
  }
}
