import { User } from 'src/common/mongoose/models/user.model';

interface IJwtPayloadUser {
  userId: string;
  refresh?: boolean;
}
interface IRequest extends Request {
  user: User;
}
export type { IJwtPayloadUser, IRequest };
