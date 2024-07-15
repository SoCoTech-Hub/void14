import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBlockInstance,
  deleteBlockInstance,
  updateBlockInstance,
} from "@soco/block-api/blockInstances/mutations";
import { 
  blockInstanceIdSchema,
  insertBlockInstanceParams,
  updateBlockInstanceParams 
} from "@soco/block-db/schema/blockInstances";

export async function POST(req: Request) {
  try {
    const validatedData = insertBlockInstanceParams.parse(await req.json());
    const { blockInstance } = await createBlockInstance(validatedData);

    revalidatePath("/blockInstances"); // optional - assumes you will have named route same as entity

    return NextResponse.json(blockInstance, { status: 201 });
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

    const validatedData = updateBlockInstanceParams.parse(await req.json());
    const validatedParams = blockInstanceIdSchema.parse({ id });

    const { blockInstance } = await updateBlockInstance(validatedParams.id, validatedData);

    return NextResponse.json(blockInstance, { status: 200 });
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

    const validatedParams = blockInstanceIdSchema.parse({ id });
    const { blockInstance } = await deleteBlockInstance(validatedParams.id);

    return NextResponse.json(blockInstance, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
