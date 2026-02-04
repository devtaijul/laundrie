import { createHash } from "crypto";

export function hashToken(token: string) {
  // store hashed OTP in DB (লিক হলে ঝুঁকি কমাতে)
  return createHash("sha256").update(token).digest("hex");
}
