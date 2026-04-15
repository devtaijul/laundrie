const NON_DIGIT_OR_PLUS = /[^\d+]/g;

function sanitizePhoneInput(input: string) {
  return input.trim().replace(NON_DIGIT_OR_PLUS, "");
}

export function normalizeNlPhone(input: string): string | null {
  const sanitized = sanitizePhoneInput(input);
  if (!sanitized) return null;

  const digitsOnly = sanitized.replace(/\D/g, "");
  let nationalNumber = "";

  if (sanitized.startsWith("+31")) {
    nationalNumber = digitsOnly.slice(2);
  } else if (sanitized.startsWith("0031")) {
    nationalNumber = digitsOnly.slice(4);
  } else if (digitsOnly.startsWith("31") && digitsOnly.length === 11) {
    // User may type "31..." while +31 is already visually fixed in the input.
    nationalNumber = digitsOnly.slice(2);
  } else if (digitsOnly.startsWith("0") && digitsOnly.length === 10) {
    // National format with trunk prefix, e.g. 06..., 020...
    nationalNumber = digitsOnly.slice(1);
  } else {
    // Rest-number only when +31 is fixed by UI.
    nationalNumber = digitsOnly;
  }

  const normalized = `+31${nationalNumber}`;

  return /^\+31\d{9}$/.test(normalized) ? normalized : null;
}

export function isValidNlPhone(input: string) {
  return normalizeNlPhone(input) !== null;
}

export function normalizeIdentifier(identifier: string) {
  const value = identifier.trim();
  if (!value) return value;

  if (value.includes("@")) {
    return value.toLowerCase();
  }

  return normalizeNlPhone(value) ?? value;
}
