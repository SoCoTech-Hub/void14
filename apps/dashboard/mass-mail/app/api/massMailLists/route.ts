import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMassMailList,
  deleteMassMailList,
  updateMassMailList,
} from "@soco/mass-mail-api/massMailLists/mutations";
import { 
  massMailListIdSchema,
  insertMassMailListParams,
  updateMassMailListParams 
} from "@soco/mass-mail-db/schema/massMailLists";

export async function POST(req: Request) {
  try {
    const validatedData = insertMassMailListParams.parse(await req.json());
    const { massMailList } = await createMassMailList(validatedData);

    revalidatePath("/massMailLists"); // optional - assumes you will have named route same as entity

    return NextResponse.json(massMailList, { status: 201 });
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

    const validatedData = updateMassMailListParams.parse(await req.json());
    const validatedParams = massMailListIdSchema.parse({ id });

    const { massMailList } = await updateMassMailList(validatedParams.id, validatedData);

    return NextResponse.json(massMailList, { status: 200 });
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

    const validatedParams = massMailListIdSchema.parse({ id });
    const { massMailList } = await deleteMassMailList(validatedParams.id);

    return NextResponse.json(massMailList, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
