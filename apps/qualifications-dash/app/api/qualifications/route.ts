import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQualification,
  deleteQualification,
  updateQualification,
} from "@/lib/api/qualifications/mutations";
import { 
  qualificationIdSchema,
  insertQualificationParams,
  updateQualificationParams 
} from "@/lib/db/schema/qualifications";

export async function POST(req: Request) {
  try {
    const validatedData = insertQualificationParams.parse(await req.json());
    const { qualification } = await createQualification(validatedData);

    revalidatePath("/qualifications"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qualification, { status: 201 });
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

    const validatedData = updateQualificationParams.parse(await req.json());
    const validatedParams = qualificationIdSchema.parse({ id });

    const { qualification } = await updateQualification(validatedParams.id, validatedData);

    return NextResponse.json(qualification, { status: 200 });
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

    const validatedParams = qualificationIdSchema.parse({ id });
    const { qualification } = await deleteQualification(validatedParams.id);

    return NextResponse.json(qualification, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
