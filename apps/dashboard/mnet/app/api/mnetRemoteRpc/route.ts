import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMnetRemoteRpc,
  deleteMnetRemoteRpc,
  updateMnetRemoteRpc,
} from "@/lib/api/mnetRemoteRpc/mutations";
import { 
  mnetRemoteRpcIdSchema,
  insertMnetRemoteRpcParams,
  updateMnetRemoteRpcParams 
} from "@/lib/db/schema/mnetRemoteRpc";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetRemoteRpcParams.parse(await req.json());
    const { mnetRemoteRpc } = await createMnetRemoteRpc(validatedData);

    revalidatePath("/mnetRemoteRpc"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetRemoteRpc, { status: 201 });
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

    const validatedData = updateMnetRemoteRpcParams.parse(await req.json());
    const validatedParams = mnetRemoteRpcIdSchema.parse({ id });

    const { mnetRemoteRpc } = await updateMnetRemoteRpc(validatedParams.id, validatedData);

    return NextResponse.json(mnetRemoteRpc, { status: 200 });
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

    const validatedParams = mnetRemoteRpcIdSchema.parse({ id });
    const { mnetRemoteRpc } = await deleteMnetRemoteRpc(validatedParams.id);

    return NextResponse.json(mnetRemoteRpc, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
