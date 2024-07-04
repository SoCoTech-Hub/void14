import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createUserDevice,
  deleteUserDevice,
  updateUserDevice,
} from "../../../lib/api/userDevices/mutations";
import {
  insertUserDeviceParams,
  updateUserDeviceParams,
  userDeviceIdSchema,
} from "../../../lib/db/schema/userDevices";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserDeviceParams.parse(await req.json());
    const { userDevice } = await createUserDevice(validatedData);

    revalidatePath("/userDevices"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userDevice, { status: 201 });
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

    const validatedData = updateUserDeviceParams.parse(await req.json());
    const validatedParams = userDeviceIdSchema.parse({ id });

    const { userDevice } = await updateUserDevice(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(userDevice, { status: 200 });
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

    const validatedParams = userDeviceIdSchema.parse({ id });
    const { userDevice } = await deleteUserDevice(validatedParams.id);

    return NextResponse.json(userDevice, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
