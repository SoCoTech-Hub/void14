import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageUserAction,
  deleteMessageUserAction,
  updateMessageUserAction,
} from "@/lib/api/messageUserActions/mutations";
import { 
  messageUserActionIdSchema,
  insertMessageUserActionParams,
  updateMessageUserActionParams 
} from "@/lib/db/schema/messageUserActions";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageUserActionParams.parse(await req.json());
    const { messageUserAction } = await createMessageUserAction(validatedData);

    revalidatePath("/messageUserActions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageUserAction, { status: 201 });
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

    const validatedData = updateMessageUserActionParams.parse(await req.json());
    const validatedParams = messageUserActionIdSchema.parse({ id });

    const { messageUserAction } = await updateMessageUserAction(validatedParams.id, validatedData);

    return NextResponse.json(messageUserAction, { status: 200 });
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

    const validatedParams = messageUserActionIdSchema.parse({ id });
    const { messageUserAction } = await deleteMessageUserAction(validatedParams.id);

    return NextResponse.json(messageUserAction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
