import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUserSchool,
  deleteUserSchool,
  updateUserSchool,
} from "@soco/school-api/userSchools/mutations";
import { 
  userSchoolIdSchema,
  insertUserSchoolParams,
  updateUserSchoolParams 
} from "@soco/school-db/schema/userSchools";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserSchoolParams.parse(await req.json());
    const { userSchool } = await createUserSchool(validatedData);

    revalidatePath("/userSchools"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userSchool, { status: 201 });
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

    const validatedData = updateUserSchoolParams.parse(await req.json());
    const validatedParams = userSchoolIdSchema.parse({ id });

    const { userSchool } = await updateUserSchool(validatedParams.id, validatedData);

    return NextResponse.json(userSchool, { status: 200 });
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

    const validatedParams = userSchoolIdSchema.parse({ id });
    const { userSchool } = await deleteUserSchool(validatedParams.id);

    return NextResponse.json(userSchool, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
