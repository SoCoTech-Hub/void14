import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createLocalizationTranslation,
  deleteLocalizationTranslation,
  updateLocalizationTranslation,
} from "../../../lib/api/localizationTranslations/mutations";
import {
  insertLocalizationTranslationParams,
  localizationTranslationIdSchema,
  updateLocalizationTranslationParams,
} from "../../../lib/db/schema/localizationTranslations";

export async function POST(req: Request) {
  try {
    const validatedData = insertLocalizationTranslationParams.parse(
      await req.json(),
    );
    const { localizationTranslation } =
      await createLocalizationTranslation(validatedData);

    revalidatePath("/localizationTranslations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(localizationTranslation, { status: 201 });
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

    const validatedData = updateLocalizationTranslationParams.parse(
      await req.json(),
    );
    const validatedParams = localizationTranslationIdSchema.parse({ id });

    const { localizationTranslation } = await updateLocalizationTranslation(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(localizationTranslation, { status: 200 });
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

    const validatedParams = localizationTranslationIdSchema.parse({ id });
    const { localizationTranslation } = await deleteLocalizationTranslation(
      validatedParams.id,
    );

    return NextResponse.json(localizationTranslation, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
