import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createNotificationResponse,
  deleteNotificationResponse,
  updateNotificationResponse,
} from "@soco/notification-api/notificationResponses/mutations";
import { 
  notificationResponseIdSchema,
  insertNotificationResponseParams,
  updateNotificationResponseParams 
} from "@soco/notification-db/schema/notificationResponses";

export async function POST(req: Request) {
  try {
    const validatedData = insertNotificationResponseParams.parse(await req.json());
    const { notificationResponse } = await createNotificationResponse(validatedData);

    revalidatePath("/notificationResponses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(notificationResponse, { status: 201 });
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

    const validatedData = updateNotificationResponseParams.parse(await req.json());
    const validatedParams = notificationResponseIdSchema.parse({ id });

    const { notificationResponse } = await updateNotificationResponse(validatedParams.id, validatedData);

    return NextResponse.json(notificationResponse, { status: 200 });
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

    const validatedParams = notificationResponseIdSchema.parse({ id });
    const { notificationResponse } = await deleteNotificationResponse(validatedParams.id);

    return NextResponse.json(notificationResponse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
