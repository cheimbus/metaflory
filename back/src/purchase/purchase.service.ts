import { BadRequestException, Injectable } from '@nestjs/common';
import dataSource from 'datasource';
import { Product } from 'src/entitis/Product';
import { UserPurchaseList } from 'src/entitis/User.purchase.list';

@Injectable()
export class PurchaseService {
  userId: number;
  productId: number;
  price: number;
  type: string;
  constructor() {
    this.userId;
    this.productId;
    this.price;
    this.type = '';
  }
  async purchaseProduct(data): Promise<any> {
    this.userId = parseInt(data.data.userId);
    this.productId = parseInt(data.data.productId);
    this.price = parseInt(data.data.price);
    this.type = data.data.type;
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const getProductInfo = await dataSource
      .getRepository(Product)
      .createQueryBuilder()
      .where('id=:id', { id: this.productId })
      .getOne();
    if (!getProductInfo) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    try {
      const userPurchaseLists = new UserPurchaseList();
      userPurchaseLists.type = this.type;
      userPurchaseLists.userId = this.userId;
      userPurchaseLists.productId = this.productId;
      userPurchaseLists.price = this.price;
      await dataSource.manager
        .getRepository(UserPurchaseList)
        .save(userPurchaseLists);
      if (getProductInfo.quantityNow !== 0) {
        const minousProductQuantity = getProductInfo.quantityNow - 1;
        await dataSource
          .createQueryBuilder()
          .update(Product)
          .set({ quantityNow: minousProductQuantity })
          .where('id=:id', { id: this.productId })
          .andWhere('isSoldout=:isSoldout', { isSoldout: false })
          .execute();
        const getCurrentProductInfo = await dataSource
          .getRepository(Product)
          .createQueryBuilder()
          .where('id=:id', { id: this.productId })
          .getOne();
        if (getCurrentProductInfo.quantityNow === 0) {
          await dataSource
            .createQueryBuilder()
            .update(Product)
            .set({ isSoldout: true })
            .where('id=:id', { id: this.productId })
            .andWhere('isSoldout=:isSoldout', { isSoldout: true })
            .execute();
          return {
            userId: this.userId,
            productId: this.productId,
            price: this.price,
            isSoldout: true,
            quantityNow: getCurrentProductInfo.quantityNow,
          };
        }
        return {
          userId: this.userId,
          productId: this.productId,
          price: this.price,
          quantityNow: getCurrentProductInfo.quantityNow,
        };
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
