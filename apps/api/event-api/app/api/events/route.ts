import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../../lib/api/events/mutations";
import {
  eventIdSchema,
  insertEventParams,
  updateEventParams,
} from "../../../lib/db/schema/events";

export async function POST(req: Request) {
  try {
    const validatedData = insertEventParams.parse(await req.json());
    const { event } = await createEvent(validatedData);

    revalidatePath("/events"); // optional - assumes you will have named route same as entity

    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateEventParams.parse(await req.json());
    const validatedParams = eventIdSchema.parse({ id });

    const { event } = await updateEvent(validatedParams.id, validatedData);

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = eventIdSchema.parse({ id });
    const { event } = await deleteEvent(validatedParams.id);

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
