import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './common/email/email.module';
import { PdfModule } from './common/pdf/pdf.module';

@Module({
  imports: [EmailModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
