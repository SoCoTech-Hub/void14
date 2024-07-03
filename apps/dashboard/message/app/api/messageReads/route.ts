import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageRead,
  deleteMessageRead,
  updateMessageRead,
} from "@/lib/api/messageReads/mutations";
import { 
  messageReadIdSchema,
  insertMessageReadParams,
  updateMessageReadParams 
} from "@/lib/db/schema/messageReads";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageReadParams.parse(await req.json());
    const { messageRead } = await createMessageRead(validatedData);

    revalidatePath("/messageReads"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageRead, { status: 201 });
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

    const validatedData = updateMessageReadParams.parse(await req.json());
    const validatedParams = messageReadIdSchema.parse({ id });

    const { messageRead } = await updateMessageRead(validatedParams.id, validatedData);

    return NextResponse.json(messageRead, { status: 200 });
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

    const validatedParams = messageReadIdSchema.parse({ id });
    const { messageRead } = await deleteMessageRead(validatedParams.id);

    return NextResponse.json(messageRead, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
