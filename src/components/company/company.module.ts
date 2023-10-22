import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyProvider } from './company.provider';

@Module({
  imports: [],
  providers: [CompanyService, ...CompanyProvider],
  controllers: [],
  exports: [CompanyService, ...CompanyProvider],
})
export class CompanyModule {}
