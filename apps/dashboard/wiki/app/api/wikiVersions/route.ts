import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWikiVersion,
  deleteWikiVersion,
  updateWikiVersion,
} from "@soco/wiki-api/wikiVersions/mutations";
import { 
  wikiVersionIdSchema,
  insertWikiVersionParams,
  updateWikiVersionParams 
} from "@soco/wiki-db/schema/wikiVersions";

export async function POST(req: Request) {
  try {
    const validatedData = insertWikiVersionParams.parse(await req.json());
    const { wikiVersion } = await createWikiVersion(validatedData);

    revalidatePath("/wikiVersions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(wikiVersion, { status: 201 });
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

    const validatedData = updateWikiVersionParams.parse(await req.json());
    const validatedParams = wikiVersionIdSchema.parse({ id });

    const { wikiVersion } = await updateWikiVersion(validatedParams.id, validatedData);

    return NextResponse.json(wikiVersion, { status: 200 });
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

    const validatedParams = wikiVersionIdSchema.parse({ id });
    const { wikiVersion } = await deleteWikiVersion(validatedParams.id);

    return NextResponse.json(wikiVersion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
