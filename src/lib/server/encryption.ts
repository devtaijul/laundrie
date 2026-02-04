import { decodeBase64 } from "@oslojs/encoding";
import { createCipheriv, createDecipheriv } from "crypto";
import { DynamicBuffer } from "@oslojs/binary";
import { env } from "@/env/server";

const envKey = env.ENCRYPTION_KEY;
const key = decodeBase64(envKey ?? "");
const keyLength = key.length;

export function encrypt(data: Uint8Array): Uint8Array {
  const iv = new Uint8Array(keyLength);
  crypto.getRandomValues(iv);
  const cipher = createCipheriv("aes-128-gcm", key, iv);
  const encrypted = new DynamicBuffer(0);
  encrypted.write(iv);
  encrypted.write(cipher.update(data));
  encrypted.write(cipher.final());
  encrypted.write(cipher.getAuthTag());
  return encrypted.bytes();
}

export function encryptString(data: string): Uint8Array {
  return encrypt(new TextEncoder().encode(data));
}

export function decrypt(encrypted: Uint8Array): Uint8Array {
  if (encrypted.byteLength < keyLength + 16) {
    throw new Error("Invalid data");
  }
  const iv = encrypted.slice(0, keyLength);
  const decipher = createDecipheriv("aes-128-gcm", key, iv);
  decipher.setAuthTag(encrypted.slice(encrypted.byteLength - 16));
  const decrypted = new DynamicBuffer(0);
  decrypted.write(
    decipher.update(encrypted.slice(keyLength, encrypted.byteLength - 16))
  );
  decrypted.write(decipher.final());
  return decrypted.bytes();
}

export function decryptToString(data: Uint8Array): string {
  return new TextDecoder().decode(decrypt(data));
}
