import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from 'src/entitis/Product';
import { UserPurchaseList } from 'src/entitis/User.purchase.list';
import { UserRoungeList } from 'src/entitis/User.rounge.list';
import { UserRoungeStory } from 'src/entitis/User.rounge.stories';
import { UserRounge } from 'src/entitis/User.rounge';
import { UserSendList } from 'src/entitis/User.send.list';
import { UserTokenList } from 'src/entitis/User.token.list';
import { User } from 'src/entitis/User';
import { Admin } from 'src/entitis/Admin';
import { Category } from 'src/entitis/Category';
import { ProductCategoryList } from 'src/entitis/Product.category.list';
import { ProductAuthor } from 'src/entitis/Product.author';

dotenv.config();
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.TEST === 'true' ? process.env.TEST_HOST : process.env.HOST,
  port:
    process.env.TEST === 'true'
      ? parseInt(process.env.TEST_DB_PORT)
      : parseInt(process.env.DB_PORT),
  username:
    process.env.TEST === 'true'
      ? process.env.TEST_USER_NAME
      : process.env.USER_NAME,
  password:
    process.env.TEST === 'true'
      ? process.env.TEST_PASSWORD
      : process.env.PASSWORD,
  database:
    process.env.TEST === 'true'
      ? process.env.TEST_DATABASE
      : process.env.DATABASE,
  entities: [
    Product,
    UserPurchaseList,
    UserRoungeList,
    UserRoungeStory,
    UserRounge,
    UserSendList,
    UserTokenList,
    User,
    Admin,
    Category,
    ProductCategoryList,
    ProductAuthor,
  ],
  migrations: [path.join(__dirname, 'src/migrations/*')],
  charset: 'utf8mb4',
  migrationsRun: true,
  synchronize: false,
  logging: true,
  connectTimeout: 1000,
  extra: { connectionLimit: 10 },
});

export default dataSource;
dataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
