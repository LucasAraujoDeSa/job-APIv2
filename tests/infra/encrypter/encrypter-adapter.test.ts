import { JsonWebTokenAdapter } from "@/infra/encrypter/encrypter-adapter";

const makeSut = () => {
  const sut = new JsonWebTokenAdapter();
  return {
    sut,
  };
};

describe("==> encrypter adapter implementation", () => {
  it("Should generate a token jwt", () => {
    const { sut } = makeSut();

    const plaintext = "password";
    const hashedPlaintext = sut.sign(plaintext);

    expect(hashedPlaintext).toBeTruthy();
  });

  it("Should verify a token", () => {
    const { sut } = makeSut();

    const account_id = "id";
    const token = sut.sign(account_id);
    const verifyToken = sut.verify(token);

    expect(verifyToken).toEqual(account_id);
  });
});
