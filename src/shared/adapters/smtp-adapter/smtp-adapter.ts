export interface SmtpAdapter {
  send(input: SmtpAdapter.Input): Promise<void>;
}

export namespace SmtpAdapter {
  export type Input = {
    id: string;
    email: string;
  };
}
