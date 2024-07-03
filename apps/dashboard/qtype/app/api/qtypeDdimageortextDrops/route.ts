import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeDdimageortextDrop,
  deleteQtypeDdimageortextDrop,
  updateQtypeDdimageortextDrop,
} from "@/lib/api/qtypeDdimageortextDrops/mutations";
import { 
  qtypeDdimageortextDropIdSchema,
  insertQtypeDdimageortextDropParams,
  updateQtypeDdimageortextDropParams 
} from "@/lib/db/schema/qtypeDdimageortextDrops";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeDdimageortextDropParams.parse(await req.json());
    const { qtypeDdimageortextDrop } = await createQtypeDdimageortextDrop(validatedData);

    revalidatePath("/qtypeDdimageortextDrops"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeDdimageortextDrop, { status: 201 });
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

    const validatedData = updateQtypeDdimageortextDropParams.parse(await req.json());
    const validatedParams = qtypeDdimageortextDropIdSchema.parse({ id });

    const { qtypeDdimageortextDrop } = await updateQtypeDdimageortextDrop(validatedParams.id, validatedData);

    return NextResponse.json(qtypeDdimageortextDrop, { status: 200 });
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

    const validatedParams = qtypeDdimageortextDropIdSchema.parse({ id });
    const { qtypeDdimageortextDrop } = await deleteQtypeDdimageortextDrop(validatedParams.id);

    return NextResponse.json(qtypeDdimageortextDrop, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
