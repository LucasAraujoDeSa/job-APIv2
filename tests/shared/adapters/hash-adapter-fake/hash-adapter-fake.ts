import { HashAdapter } from "@/shared/adapters";

export class HashAdapterFake implements HashAdapter {
  plaintext: string;

  hashedplaintext = "hashed_password";

  public async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.hashedplaintext;
  }

  public async compare(plaintext: string, hash: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.hashedplaintext = hash;
    return true;
  }
}
