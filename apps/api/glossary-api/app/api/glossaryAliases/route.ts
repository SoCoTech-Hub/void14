import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createGlossaryAlias,
  deleteGlossaryAlias,
  updateGlossaryAlias,
} from "../../../lib/api/glossaryAliases/mutations";
import {
  glossaryAliasIdSchema,
  insertGlossaryAliasParams,
  updateGlossaryAliasParams,
} from "../../../lib/db/schema/glossaryAliases";

export async function POST(req: Request) {
  try {
    const validatedData = insertGlossaryAliasParams.parse(await req.json());
    const { glossaryAlias } = await createGlossaryAlias(validatedData);

    revalidatePath("/glossaryAliases"); // optional - assumes you will have named route same as entity

    return NextResponse.json(glossaryAlias, { status: 201 });
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

    const validatedData = updateGlossaryAliasParams.parse(await req.json());
    const validatedParams = glossaryAliasIdSchema.parse({ id });

    const { glossaryAlias } = await updateGlossaryAlias(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(glossaryAlias, { status: 200 });
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

    const validatedParams = glossaryAliasIdSchema.parse({ id });
    const { glossaryAlias } = await deleteGlossaryAlias(validatedParams.id);

    return NextResponse.json(glossaryAlias, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
