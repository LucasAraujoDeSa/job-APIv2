export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
}

export interface UpdateUserModel {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  status?: string;
}
