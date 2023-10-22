import { Connection } from 'mongoose';
import { DB_PROVIDER, USER_PROVIDER } from '../../config';
import { UserSchema } from 'src/common/mongoose/models/user.model';
import { USER } from 'src/common/mongoose/consts/consts';

export const UserProvider = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) => connection.model(USER, UserSchema),
    inject: [DB_PROVIDER],
  },
];
