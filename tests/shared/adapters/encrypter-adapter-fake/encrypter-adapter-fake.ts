import { EncrypterAdapter } from "@/shared/adapters";

type VerifyToken = string | undefined;
export class EncrypterAdapterFake implements EncrypterAdapter {
  token: string;

  sub: string;

  public sign(id: string): string {
    this.token = `${id}123`;
    this.sub = id;
    return this.token;
  }

  public verify(token: string): VerifyToken {
    this.token = token;
    return this.sub;
  }
}
