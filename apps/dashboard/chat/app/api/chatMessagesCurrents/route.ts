import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createChatMessagesCurrent,
  deleteChatMessagesCurrent,
  updateChatMessagesCurrent,
} from "@soco/chat-api/chatMessagesCurrents/mutations";
import { 
  chatMessagesCurrentIdSchema,
  insertChatMessagesCurrentParams,
  updateChatMessagesCurrentParams 
} from "@soco/chat-db/schema/chatMessagesCurrents";

export async function POST(req: Request) {
  try {
    const validatedData = insertChatMessagesCurrentParams.parse(await req.json());
    const { chatMessagesCurrent } = await createChatMessagesCurrent(validatedData);

    revalidatePath("/chatMessagesCurrents"); // optional - assumes you will have named route same as entity

    return NextResponse.json(chatMessagesCurrent, { status: 201 });
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

    const validatedData = updateChatMessagesCurrentParams.parse(await req.json());
    const validatedParams = chatMessagesCurrentIdSchema.parse({ id });

    const { chatMessagesCurrent } = await updateChatMessagesCurrent(validatedParams.id, validatedData);

    return NextResponse.json(chatMessagesCurrent, { status: 200 });
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

    const validatedParams = chatMessagesCurrentIdSchema.parse({ id });
    const { chatMessagesCurrent } = await deleteChatMessagesCurrent(validatedParams.id);

    return NextResponse.json(chatMessagesCurrent, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
