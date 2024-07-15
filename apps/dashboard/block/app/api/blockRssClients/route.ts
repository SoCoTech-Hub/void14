import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBlockRssClient,
  deleteBlockRssClient,
  updateBlockRssClient,
} from "@soco/block-api/blockRssClients/mutations";
import { 
  blockRssClientIdSchema,
  insertBlockRssClientParams,
  updateBlockRssClientParams 
} from "@soco/block-db/schema/blockRssClients";

export async function POST(req: Request) {
  try {
    const validatedData = insertBlockRssClientParams.parse(await req.json());
    const { blockRssClient } = await createBlockRssClient(validatedData);

    revalidatePath("/blockRssClients"); // optional - assumes you will have named route same as entity

    return NextResponse.json(blockRssClient, { status: 201 });
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

    const validatedData = updateBlockRssClientParams.parse(await req.json());
    const validatedParams = blockRssClientIdSchema.parse({ id });

    const { blockRssClient } = await updateBlockRssClient(validatedParams.id, validatedData);

    return NextResponse.json(blockRssClient, { status: 200 });
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

    const validatedParams = blockRssClientIdSchema.parse({ id });
    const { blockRssClient } = await deleteBlockRssClient(validatedParams.id);

    return NextResponse.json(blockRssClient, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
