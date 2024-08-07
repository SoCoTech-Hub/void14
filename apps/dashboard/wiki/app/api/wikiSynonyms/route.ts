import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWikiSynonym,
  deleteWikiSynonym,
  updateWikiSynonym,
} from "@soco/wiki-api/wikiSynonyms/mutations";
import { 
  wikiSynonymIdSchema,
  insertWikiSynonymParams,
  updateWikiSynonymParams 
} from "@soco/wiki-db/schema/wikiSynonyms";

export async function POST(req: Request) {
  try {
    const validatedData = insertWikiSynonymParams.parse(await req.json());
    const { wikiSynonym } = await createWikiSynonym(validatedData);

    revalidatePath("/wikiSynonyms"); // optional - assumes you will have named route same as entity

    return NextResponse.json(wikiSynonym, { status: 201 });
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

    const validatedData = updateWikiSynonymParams.parse(await req.json());
    const validatedParams = wikiSynonymIdSchema.parse({ id });

    const { wikiSynonym } = await updateWikiSynonym(validatedParams.id, validatedData);

    return NextResponse.json(wikiSynonym, { status: 200 });
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

    const validatedParams = wikiSynonymIdSchema.parse({ id });
    const { wikiSynonym } = await deleteWikiSynonym(validatedParams.id);

    return NextResponse.json(wikiSynonym, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
