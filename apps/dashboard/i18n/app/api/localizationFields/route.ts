import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLocalizationField,
  deleteLocalizationField,
  updateLocalizationField,
} from "@soco/i18n-api/localizationFields/mutations";
import { 
  localizationFieldIdSchema,
  insertLocalizationFieldParams,
  updateLocalizationFieldParams 
} from "@soco/i18n-db/schema/localizationFields";

export async function POST(req: Request) {
  try {
    const validatedData = insertLocalizationFieldParams.parse(await req.json());
    const { localizationField } = await createLocalizationField(validatedData);

    revalidatePath("/localizationFields"); // optional - assumes you will have named route same as entity

    return NextResponse.json(localizationField, { status: 201 });
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

    const validatedData = updateLocalizationFieldParams.parse(await req.json());
    const validatedParams = localizationFieldIdSchema.parse({ id });

    const { localizationField } = await updateLocalizationField(validatedParams.id, validatedData);

    return NextResponse.json(localizationField, { status: 200 });
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

    const validatedParams = localizationFieldIdSchema.parse({ id });
    const { localizationField } = await deleteLocalizationField(validatedParams.id);

    return NextResponse.json(localizationField, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
