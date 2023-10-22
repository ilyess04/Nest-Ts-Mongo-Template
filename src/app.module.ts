import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './common/email/email.module';
import { DatabaseModule } from './common/mongoose/database/database.module';

@Module({
  imports: [EmailModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
