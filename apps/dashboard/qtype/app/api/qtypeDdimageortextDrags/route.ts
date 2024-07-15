import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeDdimageortextDrag,
  deleteQtypeDdimageortextDrag,
  updateQtypeDdimageortextDrag,
} from "@soco/qtype-api/qtypeDdimageortextDrags/mutations";
import { 
  qtypeDdimageortextDragIdSchema,
  insertQtypeDdimageortextDragParams,
  updateQtypeDdimageortextDragParams 
} from "@soco/qtype-db/schema/qtypeDdimageortextDrags";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeDdimageortextDragParams.parse(await req.json());
    const { qtypeDdimageortextDrag } = await createQtypeDdimageortextDrag(validatedData);

    revalidatePath("/qtypeDdimageortextDrags"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeDdimageortextDrag, { status: 201 });
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

    const validatedData = updateQtypeDdimageortextDragParams.parse(await req.json());
    const validatedParams = qtypeDdimageortextDragIdSchema.parse({ id });

    const { qtypeDdimageortextDrag } = await updateQtypeDdimageortextDrag(validatedParams.id, validatedData);

    return NextResponse.json(qtypeDdimageortextDrag, { status: 200 });
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

    const validatedParams = qtypeDdimageortextDragIdSchema.parse({ id });
    const { qtypeDdimageortextDrag } = await deleteQtypeDdimageortextDrag(validatedParams.id);

    return NextResponse.json(qtypeDdimageortextDrag, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
