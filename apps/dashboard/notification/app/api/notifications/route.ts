import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createNotification,
  deleteNotification,
  updateNotification,
} from "@soco/notification-api/notifications/mutations";
import { 
  notificationIdSchema,
  insertNotificationParams,
  updateNotificationParams 
} from "@soco/notification-db/schema/notifications";

export async function POST(req: Request) {
  try {
    const validatedData = insertNotificationParams.parse(await req.json());
    const { notification } = await createNotification(validatedData);

    revalidatePath("/notifications"); // optional - assumes you will have named route same as entity

    return NextResponse.json(notification, { status: 201 });
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

    const validatedData = updateNotificationParams.parse(await req.json());
    const validatedParams = notificationIdSchema.parse({ id });

    const { notification } = await updateNotification(validatedParams.id, validatedData);

    return NextResponse.json(notification, { status: 200 });
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

    const validatedParams = notificationIdSchema.parse({ id });
    const { notification } = await deleteNotification(validatedParams.id);

    return NextResponse.json(notification, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
