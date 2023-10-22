import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyProvider } from './company.provider';
import { CompanyController } from './company.controller';

@Module({
  imports: [],
  providers: [CompanyService, ...CompanyProvider],
  controllers: [CompanyController],
  exports: [CompanyService, ...CompanyProvider],
})
export class CompanyModule {}
