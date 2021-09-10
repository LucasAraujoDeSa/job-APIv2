import { SmtpAdapter } from "@/shared/adapters";

export class SmtpAdapterFake implements SmtpAdapter {
  input: SmtpAdapter.Input;

  public async send(input: SmtpAdapter.Input): Promise<void> {
    this.input = input;
  }
}
