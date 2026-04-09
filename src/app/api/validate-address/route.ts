import { isAllowedCity, SERVICE_AREA_ERROR } from "@/lib/service-area";
import { NextRequest, NextResponse } from "next/server";

interface PdokDoc {
  woonplaatsnaam?: string;
  gemeentenaam?: string;
  straatnaam?: string;
  huisnummer?: number;
  postcode?: string;
  provincienaam?: string;
  weergavenaam?: string;
}

interface PdokResponse {
  response?: {
    docs?: PdokDoc[];
    numFound?: number;
  };
}

export interface NormalizedAddress {
  line1: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  municipality: string;
  country: string;
}

export type ValidateAddressResult =
  | { ok: false; valid: false; message: string }
  | { ok: true; valid: false; reason: "address_not_found"; message: string }
  | {
      ok: true;
      valid: false;
      reason: "outside_service_area";
      city: string;
      municipality: string;
      message: string;
    }
  | { ok: true; valid: true; city: string; municipality: string; address: NormalizedAddress };

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ValidateAddressResult>> {
  let body: { address?: string; line1?: string; city?: string; zip?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, valid: false, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const query =
    body.address ?? [body.line1, body.zip, body.city].filter(Boolean).join(" ");

  if (!query.trim()) {
    return NextResponse.json(
      { ok: false, valid: false, message: "Address query is required" },
      { status: 400 },
    );
  }

  const pdokUrl = new URL(
    "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free",
  );
  pdokUrl.searchParams.set("q", query);
  pdokUrl.searchParams.set("rows", "1");
  pdokUrl.searchParams.set("fq", "type:adres");

  let pdokData: PdokResponse;

  try {
    const res = await fetch(pdokUrl.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, valid: false, message: "Address lookup service unavailable" },
        { status: 502 },
      );
    }

    pdokData = (await res.json()) as PdokResponse;
  } catch {
    return NextResponse.json(
      { ok: false, valid: false, message: "Failed to reach address lookup service" },
      { status: 502 },
    );
  }

  const docs = pdokData?.response?.docs ?? [];

  if (docs.length === 0) {
    return NextResponse.json({
      ok: true,
      valid: false,
      reason: "address_not_found",
      message: "Please enter a valid address in the Netherlands",
    });
  }

  const doc = docs[0];
  const city = doc.woonplaatsnaam ?? "";
  const municipality = doc.gemeentenaam ?? "";
  const street = doc.straatnaam ?? "";
  const houseNumber = doc.huisnummer?.toString() ?? "";
  const postalCode = doc.postcode ?? "";

  const cityAllowed = isAllowedCity(city);
  const municipalityAllowed = isAllowedCity(municipality);

  if (!cityAllowed && !municipalityAllowed) {
    return NextResponse.json({
      ok: true,
      valid: false,
      reason: "outside_service_area",
      city,
      municipality,
      message: SERVICE_AREA_ERROR,
    });
  }

  const resolvedCity = cityAllowed ? city : municipality;

  return NextResponse.json({
    ok: true,
    valid: true,
    city: resolvedCity,
    municipality,
    address: {
      line1: street && houseNumber ? `${street} ${houseNumber}` : street,
      street,
      houseNumber,
      postalCode,
      city: resolvedCity,
      municipality,
      country: "Netherlands",
    },
  });
}
