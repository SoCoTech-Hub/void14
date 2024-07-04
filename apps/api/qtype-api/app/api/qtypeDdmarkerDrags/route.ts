import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQtypeDdmarkerDrag,
  deleteQtypeDdmarkerDrag,
  updateQtypeDdmarkerDrag,
} from "../../../lib/api/qtypeDdmarkerDrags/mutations";
import {
  insertQtypeDdmarkerDragParams,
  qtypeDdmarkerDragIdSchema,
  updateQtypeDdmarkerDragParams,
} from "../../../lib/db/schema/qtypeDdmarkerDrags";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeDdmarkerDragParams.parse(await req.json());
    const { qtypeDdmarkerDrag } = await createQtypeDdmarkerDrag(validatedData);

    revalidatePath("/qtypeDdmarkerDrags"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeDdmarkerDrag, { status: 201 });
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

    const validatedData = updateQtypeDdmarkerDragParams.parse(await req.json());
    const validatedParams = qtypeDdmarkerDragIdSchema.parse({ id });

    const { qtypeDdmarkerDrag } = await updateQtypeDdmarkerDrag(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(qtypeDdmarkerDrag, { status: 200 });
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

    const validatedParams = qtypeDdmarkerDragIdSchema.parse({ id });
    const { qtypeDdmarkerDrag } = await deleteQtypeDdmarkerDrag(
      validatedParams.id,
    );

    return NextResponse.json(qtypeDdmarkerDrag, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
