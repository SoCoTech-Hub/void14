import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWikiLink,
  deleteWikiLink,
  updateWikiLink,
} from "@soco/wiki-api/wikiLinks/mutations";
import { 
  wikiLinkIdSchema,
  insertWikiLinkParams,
  updateWikiLinkParams 
} from "@soco/wiki-db/schema/wikiLinks";

export async function POST(req: Request) {
  try {
    const validatedData = insertWikiLinkParams.parse(await req.json());
    const { wikiLink } = await createWikiLink(validatedData);

    revalidatePath("/wikiLinks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(wikiLink, { status: 201 });
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

    const validatedData = updateWikiLinkParams.parse(await req.json());
    const validatedParams = wikiLinkIdSchema.parse({ id });

    const { wikiLink } = await updateWikiLink(validatedParams.id, validatedData);

    return NextResponse.json(wikiLink, { status: 200 });
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

    const validatedParams = wikiLinkIdSchema.parse({ id });
    const { wikiLink } = await deleteWikiLink(validatedParams.id);

    return NextResponse.json(wikiLink, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
