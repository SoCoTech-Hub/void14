import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageAirnotifierDevice,
  deleteMessageAirnotifierDevice,
  updateMessageAirnotifierDevice,
} from "@/lib/api/messageAirnotifierDevices/mutations";
import { 
  messageAirnotifierDeviceIdSchema,
  insertMessageAirnotifierDeviceParams,
  updateMessageAirnotifierDeviceParams 
} from "@/lib/db/schema/messageAirnotifierDevices";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageAirnotifierDeviceParams.parse(await req.json());
    const { messageAirnotifierDevice } = await createMessageAirnotifierDevice(validatedData);

    revalidatePath("/messageAirnotifierDevices"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageAirnotifierDevice, { status: 201 });
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

    const validatedData = updateMessageAirnotifierDeviceParams.parse(await req.json());
    const validatedParams = messageAirnotifierDeviceIdSchema.parse({ id });

    const { messageAirnotifierDevice } = await updateMessageAirnotifierDevice(validatedParams.id, validatedData);

    return NextResponse.json(messageAirnotifierDevice, { status: 200 });
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

    const validatedParams = messageAirnotifierDeviceIdSchema.parse({ id });
    const { messageAirnotifierDevice } = await deleteMessageAirnotifierDevice(validatedParams.id);

    return NextResponse.json(messageAirnotifierDevice, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
