export interface EncrypterAdapter {
  sign(id: string): string;
  verify(token: string): string | undefined;
}
