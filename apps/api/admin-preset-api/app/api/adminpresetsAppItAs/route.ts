import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAdminpresetsAppItA,
  deleteAdminpresetsAppItA,
  updateAdminpresetsAppItA,
} from "../../../lib/api/adminpresetsAppItAs/mutations";
import {
  adminpresetsAppItAIdSchema,
  insertAdminpresetsAppItAParams,
  updateAdminpresetsAppItAParams,
} from "../../../lib/db/schema/adminpresetsAppItAs";

export async function POST(req: Request) {
  try {
    const validatedData = insertAdminpresetsAppItAParams.parse(
      await req.json(),
    );
    const { adminpresetsAppItA } =
      await createAdminpresetsAppItA(validatedData);

    revalidatePath("/adminpresetsAppItAs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(adminpresetsAppItA, { status: 201 });
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

    const validatedData = updateAdminpresetsAppItAParams.parse(
      await req.json(),
    );
    const validatedParams = adminpresetsAppItAIdSchema.parse({ id });

    const { adminpresetsAppItA } = await updateAdminpresetsAppItA(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(adminpresetsAppItA, { status: 200 });
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

    const validatedParams = adminpresetsAppItAIdSchema.parse({ id });
    const { adminpresetsAppItA } = await deleteAdminpresetsAppItA(
      validatedParams.id,
    );

    return NextResponse.json(adminpresetsAppItA, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
