import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEventsQueue,
  deleteEventsQueue,
  updateEventsQueue,
} from "@/lib/api/eventsQueues/mutations";
import { 
  eventsQueueIdSchema,
  insertEventsQueueParams,
  updateEventsQueueParams 
} from "@/lib/db/schema/eventsQueues";

export async function POST(req: Request) {
  try {
    const validatedData = insertEventsQueueParams.parse(await req.json());
    const { eventsQueue } = await createEventsQueue(validatedData);

    revalidatePath("/eventsQueues"); // optional - assumes you will have named route same as entity

    return NextResponse.json(eventsQueue, { status: 201 });
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

    const validatedData = updateEventsQueueParams.parse(await req.json());
    const validatedParams = eventsQueueIdSchema.parse({ id });

    const { eventsQueue } = await updateEventsQueue(validatedParams.id, validatedData);

    return NextResponse.json(eventsQueue, { status: 200 });
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

    const validatedParams = eventsQueueIdSchema.parse({ id });
    const { eventsQueue } = await deleteEventsQueue(validatedParams.id);

    return NextResponse.json(eventsQueue, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
