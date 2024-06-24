import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeDdmarker,
  deleteQtypeDdmarker,
  updateQtypeDdmarker,
} from "@/lib/api/qtypeDdmarkers/mutations";
import { 
  qtypeDdmarkerIdSchema,
  insertQtypeDdmarkerParams,
  updateQtypeDdmarkerParams 
} from "@/lib/db/schema/qtypeDdmarkers";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeDdmarkerParams.parse(await req.json());
    const { qtypeDdmarker } = await createQtypeDdmarker(validatedData);

    revalidatePath("/qtypeDdmarkers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeDdmarker, { status: 201 });
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

    const validatedData = updateQtypeDdmarkerParams.parse(await req.json());
    const validatedParams = qtypeDdmarkerIdSchema.parse({ id });

    const { qtypeDdmarker } = await updateQtypeDdmarker(validatedParams.id, validatedData);

    return NextResponse.json(qtypeDdmarker, { status: 200 });
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

    const validatedParams = qtypeDdmarkerIdSchema.parse({ id });
    const { qtypeDdmarker } = await deleteQtypeDdmarker(validatedParams.id);

    return NextResponse.json(qtypeDdmarker, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
