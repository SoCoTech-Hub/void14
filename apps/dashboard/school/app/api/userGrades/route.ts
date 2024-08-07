import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUserGrade,
  deleteUserGrade,
  updateUserGrade,
} from "@soco/school-api/userGrades/mutations";
import { 
  userGradeIdSchema,
  insertUserGradeParams,
  updateUserGradeParams 
} from "@soco/school-db/schema/userGrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserGradeParams.parse(await req.json());
    const { userGrade } = await createUserGrade(validatedData);

    revalidatePath("/userGrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userGrade, { status: 201 });
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

    const validatedData = updateUserGradeParams.parse(await req.json());
    const validatedParams = userGradeIdSchema.parse({ id });

    const { userGrade } = await updateUserGrade(validatedParams.id, validatedData);

    return NextResponse.json(userGrade, { status: 200 });
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

    const validatedParams = userGradeIdSchema.parse({ id });
    const { userGrade } = await deleteUserGrade(validatedParams.id);

    return NextResponse.json(userGrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
