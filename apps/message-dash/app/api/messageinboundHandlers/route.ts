import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageinboundHandler,
  deleteMessageinboundHandler,
  updateMessageinboundHandler,
} from "@/lib/api/messageinboundHandlers/mutations";
import { 
  messageinboundHandlerIdSchema,
  insertMessageinboundHandlerParams,
  updateMessageinboundHandlerParams 
} from "@/lib/db/schema/messageinboundHandlers";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageinboundHandlerParams.parse(await req.json());
    const { messageinboundHandler } = await createMessageinboundHandler(validatedData);

    revalidatePath("/messageinboundHandlers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageinboundHandler, { status: 201 });
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

    const validatedData = updateMessageinboundHandlerParams.parse(await req.json());
    const validatedParams = messageinboundHandlerIdSchema.parse({ id });

    const { messageinboundHandler } = await updateMessageinboundHandler(validatedParams.id, validatedData);

    return NextResponse.json(messageinboundHandler, { status: 200 });
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

    const validatedParams = messageinboundHandlerIdSchema.parse({ id });
    const { messageinboundHandler } = await deleteMessageinboundHandler(validatedParams.id);

    return NextResponse.json(messageinboundHandler, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
