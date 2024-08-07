import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGender,
  deleteGender,
  updateGender,
} from "@soco/profile-api/genders/mutations";
import { 
  genderIdSchema,
  insertGenderParams,
  updateGenderParams 
} from "@soco/profile-db/schema/genders";

export async function POST(req: Request) {
  try {
    const validatedData = insertGenderParams.parse(await req.json());
    const { gender } = await createGender(validatedData);

    revalidatePath("/genders"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gender, { status: 201 });
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

    const validatedData = updateGenderParams.parse(await req.json());
    const validatedParams = genderIdSchema.parse({ id });

    const { gender } = await updateGender(validatedParams.id, validatedData);

    return NextResponse.json(gender, { status: 200 });
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

    const validatedParams = genderIdSchema.parse({ id });
    const { gender } = await deleteGender(validatedParams.id);

    return NextResponse.json(gender, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
