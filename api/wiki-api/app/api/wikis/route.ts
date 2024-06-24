import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWiki,
  deleteWiki,
  updateWiki,
} from "@/lib/api/wikis/mutations";
import { 
  wikiIdSchema,
  insertWikiParams,
  updateWikiParams 
} from "@/lib/db/schema/wikis";

export async function POST(req: Request) {
  try {
    const validatedData = insertWikiParams.parse(await req.json());
    const { wiki } = await createWiki(validatedData);

    revalidatePath("/wikis"); // optional - assumes you will have named route same as entity

    return NextResponse.json(wiki, { status: 201 });
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

    const validatedData = updateWikiParams.parse(await req.json());
    const validatedParams = wikiIdSchema.parse({ id });

    const { wiki } = await updateWiki(validatedParams.id, validatedData);

    return NextResponse.json(wiki, { status: 200 });
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

    const validatedParams = wikiIdSchema.parse({ id });
    const { wiki } = await deleteWiki(validatedParams.id);

    return NextResponse.json(wiki, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
