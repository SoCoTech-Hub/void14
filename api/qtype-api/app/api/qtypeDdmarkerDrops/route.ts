import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeDdmarkerDrop,
  deleteQtypeDdmarkerDrop,
  updateQtypeDdmarkerDrop,
} from "@/lib/api/qtypeDdmarkerDrops/mutations";
import { 
  qtypeDdmarkerDropIdSchema,
  insertQtypeDdmarkerDropParams,
  updateQtypeDdmarkerDropParams 
} from "@/lib/db/schema/qtypeDdmarkerDrops";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeDdmarkerDropParams.parse(await req.json());
    const { qtypeDdmarkerDrop } = await createQtypeDdmarkerDrop(validatedData);

    revalidatePath("/qtypeDdmarkerDrops"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeDdmarkerDrop, { status: 201 });
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

    const validatedData = updateQtypeDdmarkerDropParams.parse(await req.json());
    const validatedParams = qtypeDdmarkerDropIdSchema.parse({ id });

    const { qtypeDdmarkerDrop } = await updateQtypeDdmarkerDrop(validatedParams.id, validatedData);

    return NextResponse.json(qtypeDdmarkerDrop, { status: 200 });
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

    const validatedParams = qtypeDdmarkerDropIdSchema.parse({ id });
    const { qtypeDdmarkerDrop } = await deleteQtypeDdmarkerDrop(validatedParams.id);

    return NextResponse.json(qtypeDdmarkerDrop, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
