import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCountry,
  deleteCountry,
  updateCountry,
} from "@soco/geolocalize-api/countries/mutations";
import { 
  countryIdSchema,
  insertCountryParams,
  updateCountryParams 
} from "@soco/geolocalize-db/schema/countries";

export async function POST(req: Request) {
  try {
    const validatedData = insertCountryParams.parse(await req.json());
    const { country } = await createCountry(validatedData);

    revalidatePath("/countries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(country, { status: 201 });
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

    const validatedData = updateCountryParams.parse(await req.json());
    const validatedParams = countryIdSchema.parse({ id });

    const { country } = await updateCountry(validatedParams.id, validatedData);

    return NextResponse.json(country, { status: 200 });
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

    const validatedParams = countryIdSchema.parse({ id });
    const { country } = await deleteCountry(validatedParams.id);

    return NextResponse.json(country, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
