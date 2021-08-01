import { HashAdapter } from "@/shared/adapters";

export class HashAdapterFake implements HashAdapter {
  plaintext: string;

  hashedplaintext: string;

  public async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return "hashed_password";
  }

  public async compare(plaintext: string, hash: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.hashedplaintext = hash;
    return true;
  }
}
