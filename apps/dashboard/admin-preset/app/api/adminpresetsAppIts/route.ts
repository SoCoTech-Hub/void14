import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAdminpresetsAppIt,
  deleteAdminpresetsAppIt,
  updateAdminpresetsAppIt,
} from "@soco/admin-preset-api/adminpresetsAppIts/mutations";
import { 
  adminpresetsAppItIdSchema,
  insertAdminpresetsAppItParams,
  updateAdminpresetsAppItParams 
} from "@soco/admin-preset-db/schema/adminpresetsAppIts";

export async function POST(req: Request) {
  try {
    const validatedData = insertAdminpresetsAppItParams.parse(await req.json());
    const { adminpresetsAppIt } = await createAdminpresetsAppIt(validatedData);

    revalidatePath("/adminpresetsAppIts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(adminpresetsAppIt, { status: 201 });
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

    const validatedData = updateAdminpresetsAppItParams.parse(await req.json());
    const validatedParams = adminpresetsAppItIdSchema.parse({ id });

    const { adminpresetsAppIt } = await updateAdminpresetsAppIt(validatedParams.id, validatedData);

    return NextResponse.json(adminpresetsAppIt, { status: 200 });
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

    const validatedParams = adminpresetsAppItIdSchema.parse({ id });
    const { adminpresetsAppIt } = await deleteAdminpresetsAppIt(validatedParams.id);

    return NextResponse.json(adminpresetsAppIt, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
