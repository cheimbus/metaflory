import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import { Category } from 'src/entitis/Category';

@Injectable()
export class CategoriesService {
  constructor(private configService: ConfigService) {}
  async createCategory(data): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const existCategory = await dataSource
      .getRepository(Category)
      .createQueryBuilder()
      .where('name=:name', { name: data.data.name })
      .getOne();
    if (existCategory) {
      throw new BadRequestException('이미 존재합니다.');
    }
    try {
      const category = new Category();
      category.name = data.data.name;
      category.content = data.data.content;
      await dataSource.getRepository(Category).save(category);
      await queryRunner.commitTransaction();
      return { name: data.data.name, content: data.data.content };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getCategoryList(): Promise<any> {
    const categories = await dataSource
      .getRepository(Category)
      .createQueryBuilder()
      .getMany();
    const categoryList = [];
    for (let i = 0; i < categories.length; i++) {
      categoryList.push({
        name: categories[i].name,
        content: categories[i].content,
        modifyCategoryUri: `${
          this.configService.get('TEST') === 'true'
            ? this.configService.get('TEST_COMMON_PATH')
            : this.configService.get('COMMON_PATH')
        }category/${categories[i].name}/mo`,
      });
    }
    return categoryList;
  }

  async modifyCategory(data, name: string): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await dataSource
        .createQueryBuilder()
        .update(Category)
        .set({ name: data.data.name, content: data.data.content })
        .where('name=:name', { name })
        .execute();
      await queryRunner.commitTransaction();
      return {
        name: data.data.name,
        content: data.data.content,
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
