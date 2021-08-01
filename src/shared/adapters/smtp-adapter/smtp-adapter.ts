export interface SmtpAdapter {
  send(params: SmtpAdapter.Params): Promise<void>;
}

export namespace SmtpAdapter {
  export type Params = {
    id: string;
    email: string;
  };
}
