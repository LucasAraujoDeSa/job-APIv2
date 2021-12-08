export interface EncrypterAdapter {
  sign(id: string): Promise<string>;
  verify(token: string): Promise<string>;
}
