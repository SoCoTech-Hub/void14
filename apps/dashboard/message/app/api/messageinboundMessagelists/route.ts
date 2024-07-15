import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageinboundMessagelist,
  deleteMessageinboundMessagelist,
  updateMessageinboundMessagelist,
} from "@soco/message-api/messageinboundMessagelists/mutations";
import { 
  messageinboundMessagelistIdSchema,
  insertMessageinboundMessagelistParams,
  updateMessageinboundMessagelistParams 
} from "@soco/message-db/schema/messageinboundMessagelists";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageinboundMessagelistParams.parse(await req.json());
    const { messageinboundMessagelist } = await createMessageinboundMessagelist(validatedData);

    revalidatePath("/messageinboundMessagelists"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageinboundMessagelist, { status: 201 });
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

    const validatedData = updateMessageinboundMessagelistParams.parse(await req.json());
    const validatedParams = messageinboundMessagelistIdSchema.parse({ id });

    const { messageinboundMessagelist } = await updateMessageinboundMessagelist(validatedParams.id, validatedData);

    return NextResponse.json(messageinboundMessagelist, { status: 200 });
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

    const validatedParams = messageinboundMessagelistIdSchema.parse({ id });
    const { messageinboundMessagelist } = await deleteMessageinboundMessagelist(validatedParams.id);

    return NextResponse.json(messageinboundMessagelist, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
