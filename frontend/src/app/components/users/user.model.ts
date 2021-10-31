export interface User {
  readonly id: string;
  username: string;
  name: string;
  role: string;
  password: string;
  disabled: boolean;
  expired: boolean;
}
