import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCountryOrganization,
  deleteCountryOrganization,
  updateCountryOrganization,
} from "@soco/geolocalize-api/countryOrganizations/mutations";
import { 
  countryOrganizationIdSchema,
  insertCountryOrganizationParams,
  updateCountryOrganizationParams 
} from "@soco/geolocalize-db/schema/countryOrganizations";

export async function POST(req: Request) {
  try {
    const validatedData = insertCountryOrganizationParams.parse(await req.json());
    const { countryOrganization } = await createCountryOrganization(validatedData);

    revalidatePath("/countryOrganizations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(countryOrganization, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateCountryOrganizationParams.parse(await req.json());
    const validatedParams = countryOrganizationIdSchema.parse({ id });

    const { countryOrganization } = await updateCountryOrganization(validatedParams.id, validatedData);

    return NextResponse.json(countryOrganization, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = countryOrganizationIdSchema.parse({ id });
    const { countryOrganization } = await deleteCountryOrganization(validatedParams.id);

    return NextResponse.json(countryOrganization, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
