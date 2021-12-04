import { hash, compare } from "bcrypt";
import { HashAdapter } from "@/shared/adapters";

export class BcryptAdapter implements HashAdapter {
  public async hash(plaintext: string): Promise<string> {
    const hashedPlaintext = await hash(plaintext, 10);

    return hashedPlaintext;
  }

  public async compare(plaintext: string, hash: string): Promise<boolean> {
    const isValid = await compare(plaintext, hash);

    return isValid;
  }
}
