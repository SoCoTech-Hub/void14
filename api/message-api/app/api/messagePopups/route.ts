import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessagePopup,
  deleteMessagePopup,
  updateMessagePopup,
} from "@/lib/api/messagePopups/mutations";
import { 
  messagePopupIdSchema,
  insertMessagePopupParams,
  updateMessagePopupParams 
} from "@/lib/db/schema/messagePopups";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessagePopupParams.parse(await req.json());
    const { messagePopup } = await createMessagePopup(validatedData);

    revalidatePath("/messagePopups"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messagePopup, { status: 201 });
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

    const validatedData = updateMessagePopupParams.parse(await req.json());
    const validatedParams = messagePopupIdSchema.parse({ id });

    const { messagePopup } = await updateMessagePopup(validatedParams.id, validatedData);

    return NextResponse.json(messagePopup, { status: 200 });
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

    const validatedParams = messagePopupIdSchema.parse({ id });
    const { messagePopup } = await deleteMessagePopup(validatedParams.id);

    return NextResponse.json(messagePopup, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
