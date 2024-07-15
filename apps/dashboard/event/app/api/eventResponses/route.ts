import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEventResponse,
  deleteEventResponse,
  updateEventResponse,
} from "@soco/event-api/eventResponses/mutations";
import { 
  eventResponseIdSchema,
  insertEventResponseParams,
  updateEventResponseParams 
} from "@soco/event-db/schema/eventResponses";

export async function POST(req: Request) {
  try {
    const validatedData = insertEventResponseParams.parse(await req.json());
    const { eventResponse } = await createEventResponse(validatedData);

    revalidatePath("/eventResponses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(eventResponse, { status: 201 });
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

    const validatedData = updateEventResponseParams.parse(await req.json());
    const validatedParams = eventResponseIdSchema.parse({ id });

    const { eventResponse } = await updateEventResponse(validatedParams.id, validatedData);

    return NextResponse.json(eventResponse, { status: 200 });
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

    const validatedParams = eventResponseIdSchema.parse({ id });
    const { eventResponse } = await deleteEventResponse(validatedParams.id);

    return NextResponse.json(eventResponse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
