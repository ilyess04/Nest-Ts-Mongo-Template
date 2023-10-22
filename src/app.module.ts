import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './common/email/email.module';
import { DatabaseModule } from './common/mongoose/database/database.module';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [EmailModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
