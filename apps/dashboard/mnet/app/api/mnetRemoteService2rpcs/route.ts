import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMnetRemoteService2rpc,
  deleteMnetRemoteService2rpc,
  updateMnetRemoteService2rpc,
} from "@/lib/api/mnetRemoteService2rpcs/mutations";
import { 
  mnetRemoteService2rpcIdSchema,
  insertMnetRemoteService2rpcParams,
  updateMnetRemoteService2rpcParams 
} from "@/lib/db/schema/mnetRemoteService2rpcs";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetRemoteService2rpcParams.parse(await req.json());
    const { mnetRemoteService2rpc } = await createMnetRemoteService2rpc(validatedData);

    revalidatePath("/mnetRemoteService2rpcs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetRemoteService2rpc, { status: 201 });
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

    const validatedData = updateMnetRemoteService2rpcParams.parse(await req.json());
    const validatedParams = mnetRemoteService2rpcIdSchema.parse({ id });

    const { mnetRemoteService2rpc } = await updateMnetRemoteService2rpc(validatedParams.id, validatedData);

    return NextResponse.json(mnetRemoteService2rpc, { status: 200 });
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

    const validatedParams = mnetRemoteService2rpcIdSchema.parse({ id });
    const { mnetRemoteService2rpc } = await deleteMnetRemoteService2rpc(validatedParams.id);

    return NextResponse.json(mnetRemoteService2rpc, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
