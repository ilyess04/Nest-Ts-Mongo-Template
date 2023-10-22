interface IUserCommon {
  firstName: string;
  lastName: string;
  mail: string;
  roles: string[];
  hasAccess: boolean;
}
interface IEditUser extends IUserCommon {
  _id: string;
  updatedBy: string;
}
export type { IEditUser };
