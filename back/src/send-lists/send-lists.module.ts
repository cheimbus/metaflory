import { Module } from '@nestjs/common';
import { SendListsService } from './send-lists.service';
import { SendListsController } from './send-lists.controller';

@Module({
  providers: [SendListsService],
  controllers: [SendListsController],
})
export class SendListsModule {}
