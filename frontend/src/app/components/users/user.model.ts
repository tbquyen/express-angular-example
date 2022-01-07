export interface User {
  readonly _id: string;
  username: string;
  name: string;
  role: string;
  password: string;
  disabled: boolean;
  expired: boolean;
}

export class Role {
  public static ADMIN='ADMIN';
  public static MENTOR='MENTOR';
  public static MEMBER='MEMBER';
}