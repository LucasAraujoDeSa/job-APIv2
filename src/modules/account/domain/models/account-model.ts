export interface AccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string | undefined;
  role: string | undefined;
}
