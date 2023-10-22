import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Company } from 'src/common/mongoose/models/company.model';
import { COMPANY_PROVIDER } from 'src/config';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_PROVIDER) private readonly userModel: Model<Company>,
  ) {}
}
