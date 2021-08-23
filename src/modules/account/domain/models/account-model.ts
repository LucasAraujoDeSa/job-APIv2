export interface AccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
}

export interface UpdateAccountModel {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  status?: string;
}
