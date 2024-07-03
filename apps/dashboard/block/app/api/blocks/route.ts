import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBlock,
  deleteBlock,
  updateBlock,
} from "@/lib/api/blocks/mutations";
import { 
  blockIdSchema,
  insertBlockParams,
  updateBlockParams 
} from "@/lib/db/schema/blocks";

export async function POST(req: Request) {
  try {
    const validatedData = insertBlockParams.parse(await req.json());
    const { block } = await createBlock(validatedData);

    revalidatePath("/blocks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(block, { status: 201 });
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

    const validatedData = updateBlockParams.parse(await req.json());
    const validatedParams = blockIdSchema.parse({ id });

    const { block } = await updateBlock(validatedParams.id, validatedData);

    return NextResponse.json(block, { status: 200 });
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

    const validatedParams = blockIdSchema.parse({ id });
    const { block } = await deleteBlock(validatedParams.id);

    return NextResponse.json(block, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
