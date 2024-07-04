import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createLocalizationLanguage,
  deleteLocalizationLanguage,
  updateLocalizationLanguage,
} from "../../../lib/api/localizationLanguages/mutations";
import {
  insertLocalizationLanguageParams,
  localizationLanguageIdSchema,
  updateLocalizationLanguageParams,
} from "../../../lib/db/schema/localizationLanguages";

export async function POST(req: Request) {
  try {
    const validatedData = insertLocalizationLanguageParams.parse(
      await req.json(),
    );
    const { localizationLanguage } =
      await createLocalizationLanguage(validatedData);

    revalidatePath("/localizationLanguages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(localizationLanguage, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateLocalizationLanguageParams.parse(
      await req.json(),
    );
    const validatedParams = localizationLanguageIdSchema.parse({ id });

    const { localizationLanguage } = await updateLocalizationLanguage(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(localizationLanguage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = localizationLanguageIdSchema.parse({ id });
    const { localizationLanguage } = await deleteLocalizationLanguage(
      validatedParams.id,
    );

    return NextResponse.json(localizationLanguage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
