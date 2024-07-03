import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createChat,
  deleteChat,
  updateChat,
} from "@/lib/api/chats/mutations";
import { 
  chatIdSchema,
  insertChatParams,
  updateChatParams 
} from "@/lib/db/schema/chats";

export async function POST(req: Request) {
  try {
    const validatedData = insertChatParams.parse(await req.json());
    const { chat } = await createChat(validatedData);

    revalidatePath("/chats"); // optional - assumes you will have named route same as entity

    return NextResponse.json(chat, { status: 201 });
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

    const validatedData = updateChatParams.parse(await req.json());
    const validatedParams = chatIdSchema.parse({ id });

    const { chat } = await updateChat(validatedParams.id, validatedData);

    return NextResponse.json(chat, { status: 200 });
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

    const validatedParams = chatIdSchema.parse({ id });
    const { chat } = await deleteChat(validatedParams.id);

    return NextResponse.json(chat, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
