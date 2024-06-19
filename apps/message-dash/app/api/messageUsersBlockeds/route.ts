import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageUsersBlocked,
  deleteMessageUsersBlocked,
  updateMessageUsersBlocked,
} from "@/lib/api/messageUsersBlockeds/mutations";
import { 
  messageUsersBlockedIdSchema,
  insertMessageUsersBlockedParams,
  updateMessageUsersBlockedParams 
} from "@/lib/db/schema/messageUsersBlockeds";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageUsersBlockedParams.parse(await req.json());
    const { messageUsersBlocked } = await createMessageUsersBlocked(validatedData);

    revalidatePath("/messageUsersBlockeds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageUsersBlocked, { status: 201 });
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

    const validatedData = updateMessageUsersBlockedParams.parse(await req.json());
    const validatedParams = messageUsersBlockedIdSchema.parse({ id });

    const { messageUsersBlocked } = await updateMessageUsersBlocked(validatedParams.id, validatedData);

    return NextResponse.json(messageUsersBlocked, { status: 200 });
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

    const validatedParams = messageUsersBlockedIdSchema.parse({ id });
    const { messageUsersBlocked } = await deleteMessageUsersBlocked(validatedParams.id);

    return NextResponse.json(messageUsersBlocked, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
