import { HashAdapter } from "@/shared/adapters";
import { hash, compare } from "bcrypt";

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
