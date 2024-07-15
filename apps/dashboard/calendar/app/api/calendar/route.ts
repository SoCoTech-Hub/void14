import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCalendar,
  deleteCalendar,
  updateCalendar,
} from "@soco/calendar-api/calendar/mutations";
import { 
  calendarIdSchema,
  insertCalendarParams,
  updateCalendarParams 
} from "@soco/calendar-db/schema/calendar";

export async function POST(req: Request) {
  try {
    const validatedData = insertCalendarParams.parse(await req.json());
    const { calendar } = await createCalendar(validatedData);

    revalidatePath("/calendar"); // optional - assumes you will have named route same as entity

    return NextResponse.json(calendar, { status: 201 });
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

    const validatedData = updateCalendarParams.parse(await req.json());
    const validatedParams = calendarIdSchema.parse({ id });

    const { calendar } = await updateCalendar(validatedParams.id, validatedData);

    return NextResponse.json(calendar, { status: 200 });
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

    const validatedParams = calendarIdSchema.parse({ id });
    const { calendar } = await deleteCalendar(validatedParams.id);

    return NextResponse.json(calendar, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
