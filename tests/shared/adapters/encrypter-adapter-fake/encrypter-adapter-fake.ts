import { EncrypterAdapter } from "@/shared/adapters";

export class EncrypterAdapterFake implements EncrypterAdapter {
  token: string;

  sub: string;

  public async sign(id: string): Promise<string> {
    this.token = `${id}123`;
    this.sub = id;
    return this.token;
  }

  public async verify(token: string): Promise<string> {
    this.token = token;
    return this.sub;
  }
}
