import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEventsQueueHandler,
  deleteEventsQueueHandler,
  updateEventsQueueHandler,
} from "@/lib/api/eventsQueueHandlers/mutations";
import { 
  eventsQueueHandlerIdSchema,
  insertEventsQueueHandlerParams,
  updateEventsQueueHandlerParams 
} from "@/lib/db/schema/eventsQueueHandlers";

export async function POST(req: Request) {
  try {
    const validatedData = insertEventsQueueHandlerParams.parse(await req.json());
    const { eventsQueueHandler } = await createEventsQueueHandler(validatedData);

    revalidatePath("/eventsQueueHandlers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(eventsQueueHandler, { status: 201 });
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

    const validatedData = updateEventsQueueHandlerParams.parse(await req.json());
    const validatedParams = eventsQueueHandlerIdSchema.parse({ id });

    const { eventsQueueHandler } = await updateEventsQueueHandler(validatedParams.id, validatedData);

    return NextResponse.json(eventsQueueHandler, { status: 200 });
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

    const validatedParams = eventsQueueHandlerIdSchema.parse({ id });
    const { eventsQueueHandler } = await deleteEventsQueueHandler(validatedParams.id);

    return NextResponse.json(eventsQueueHandler, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
