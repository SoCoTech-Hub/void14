import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createSchool,
  deleteSchool,
  updateSchool,
} from "../../../lib/api/schools/mutations";
import {
  insertSchoolParams,
  schoolIdSchema,
  updateSchoolParams,
} from "../../../lib/db/schema/schools";

export async function POST(req: Request) {
  try {
    const validatedData = insertSchoolParams.parse(await req.json());
    const { school } = await createSchool(validatedData);

    revalidatePath("/schools"); // optional - assumes you will have named route same as entity

    return NextResponse.json(school, { status: 201 });
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

    const validatedData = updateSchoolParams.parse(await req.json());
    const validatedParams = schoolIdSchema.parse({ id });

    const { school } = await updateSchool(validatedParams.id, validatedData);

    return NextResponse.json(school, { status: 200 });
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

    const validatedParams = schoolIdSchema.parse({ id });
    const { school } = await deleteSchool(validatedParams.id);

    return NextResponse.json(school, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
