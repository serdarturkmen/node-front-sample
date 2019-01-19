export interface IUser {
  id?: number;
  email?: string;
  password?: number;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public email?: string,
    public password?: number
  ) {
  }
}
