import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICreateCompany } from 'src/common/interfaces/company';
import { Company } from 'src/common/mongoose/models/company.model';
import { COMPANY_PROVIDER } from 'src/config';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_PROVIDER) private readonly companyModel: Model<Company>,
  ) {}
  async createCompany(payload: ICreateCompany): Promise<Company> {
    return await this.companyModel.create(payload);
  }
}
