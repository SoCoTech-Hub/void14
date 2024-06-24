import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMnetRpc,
  deleteMnetRpc,
  updateMnetRpc,
} from "@/lib/api/mnetRpcs/mutations";
import { 
  mnetRpcIdSchema,
  insertMnetRpcParams,
  updateMnetRpcParams 
} from "@/lib/db/schema/mnetRpcs";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetRpcParams.parse(await req.json());
    const { mnetRpc } = await createMnetRpc(validatedData);

    revalidatePath("/mnetRpcs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetRpc, { status: 201 });
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

    const validatedData = updateMnetRpcParams.parse(await req.json());
    const validatedParams = mnetRpcIdSchema.parse({ id });

    const { mnetRpc } = await updateMnetRpc(validatedParams.id, validatedData);

    return NextResponse.json(mnetRpc, { status: 200 });
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

    const validatedParams = mnetRpcIdSchema.parse({ id });
    const { mnetRpc } = await deleteMnetRpc(validatedParams.id);

    return NextResponse.json(mnetRpc, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
