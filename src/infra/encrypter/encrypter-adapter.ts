import { sign, verify } from "jsonwebtoken";
import { EncrypterAdapter } from "@/shared/adapters";

type VerifyToken = string | undefined;

export class JsonWebTokenAdapter implements EncrypterAdapter {
  public sign(id: string): string {
    const token = sign({}, "secret", { subject: id, expiresIn: "6d" });

    return token;
  }

  public verify(token: string): VerifyToken {
    try {
      const verifyToken = verify(token, "secret");
      const { sub } = verifyToken;
      return String(sub);
    } catch {
      return undefined;
    }
  }
}
