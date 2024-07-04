import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createWikiPage,
  deleteWikiPage,
  updateWikiPage,
} from "../../../lib/api/wikiPages/mutations";
import {
  insertWikiPageParams,
  updateWikiPageParams,
  wikiPageIdSchema,
} from "../../../lib/db/schema/wikiPages";

export async function POST(req: Request) {
  try {
    const validatedData = insertWikiPageParams.parse(await req.json());
    const { wikiPage } = await createWikiPage(validatedData);

    revalidatePath("/wikiPages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(wikiPage, { status: 201 });
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

    const validatedData = updateWikiPageParams.parse(await req.json());
    const validatedParams = wikiPageIdSchema.parse({ id });

    const { wikiPage } = await updateWikiPage(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(wikiPage, { status: 200 });
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

    const validatedParams = wikiPageIdSchema.parse({ id });
    const { wikiPage } = await deleteWikiPage(validatedParams.id);

    return NextResponse.json(wikiPage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
