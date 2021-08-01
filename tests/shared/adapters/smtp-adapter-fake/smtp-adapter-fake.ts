import { SmtpAdapter } from "@/shared/adapters";

export class SmtpAdapterFake implements SmtpAdapter {
  params: SmtpAdapter.Params;

  public async send(params: SmtpAdapter.Params): Promise<void> {
    this.params = params;
  }
}
