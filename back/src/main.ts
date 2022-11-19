import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { successInterceptor } from './common/success.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors(); //실섭에선 url같을테니 빼기
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new successInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  // 버전 바뀔때마다 바꿔줘야함
  const config = new DocumentBuilder()
    .setTitle('metafloris API')
    .setDescription('메타플로리스 API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  /**
   * swagger 사용할 때 사용자, 비밀번호 입력할 때 작성
   */
  // app.use(
  //   [configService.get('SWAGGER_PATH')],
  //   expressBasicAuth({
  //     challenge: true,
  //     users: {
  //       [configService.get('SWAGGER_USER')]:
  //         configService.get('SWAGGER_PASSWORD'),
  //     },
  //   }),
  // );
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    configService.get('SWAGGER_URL'),
    app,
    document,
    swaggerCustomOptions,
  );

  await app.listen(configService.get('PORT'));
  console.log(`listening on port ${configService.get('PORT')} `);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
