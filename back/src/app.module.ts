import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KakaoLogin, MyService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [MyService, KakaoLogin],
})
export class AppModule {}
