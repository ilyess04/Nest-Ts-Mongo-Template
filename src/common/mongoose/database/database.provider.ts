import * as mongoose from 'mongoose';
import { DB_PROVIDER } from 'src/config';
export const DatabaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(process.env.DB_CONNECT, {
        autoCreate : true, 
        autoIndex :true,
      });
    },
  },
];
