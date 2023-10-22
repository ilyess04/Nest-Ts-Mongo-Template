import { Connection } from 'mongoose';
import { DB_PROVIDER, COMPANY_PROVIDER } from '../../config';
import { COMPANY } from 'src/common/mongoose/consts/consts';
import { CompanySchema } from 'src/common/mongoose/models/company.model';

export const CompanyProvider = [
  {
    provide: COMPANY_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(COMPANY, CompanySchema),
    inject: [DB_PROVIDER],
  },
];
