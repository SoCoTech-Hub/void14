import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createChatUser,
  deleteChatUser,
  updateChatUser,
} from "@soco/chat-api/chatUsers/mutations";
import { 
  chatUserIdSchema,
  insertChatUserParams,
  updateChatUserParams 
} from "@soco/chat-db/schema/chatUsers";

export async function POST(req: Request) {
  try {
    const validatedData = insertChatUserParams.parse(await req.json());
    const { chatUser } = await createChatUser(validatedData);

    revalidatePath("/chatUsers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(chatUser, { status: 201 });
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

    const validatedData = updateChatUserParams.parse(await req.json());
    const validatedParams = chatUserIdSchema.parse({ id });

    const { chatUser } = await updateChatUser(validatedParams.id, validatedData);

    return NextResponse.json(chatUser, { status: 200 });
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

    const validatedParams = chatUserIdSchema.parse({ id });
    const { chatUser } = await deleteChatUser(validatedParams.id);

    return NextResponse.json(chatUser, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
