import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiUser,
  deleteEnrolLtiUser,
  updateEnrolLtiUser,
} from "@soco/enrol-api/enrolLtiUsers/mutations";
import { 
  enrolLtiUserIdSchema,
  insertEnrolLtiUserParams,
  updateEnrolLtiUserParams 
} from "@soco/enrol-db/schema/enrolLtiUsers";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiUserParams.parse(await req.json());
    const { enrolLtiUser } = await createEnrolLtiUser(validatedData);

    revalidatePath("/enrolLtiUsers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiUser, { status: 201 });
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

    const validatedData = updateEnrolLtiUserParams.parse(await req.json());
    const validatedParams = enrolLtiUserIdSchema.parse({ id });

    const { enrolLtiUser } = await updateEnrolLtiUser(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiUser, { status: 200 });
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

    const validatedParams = enrolLtiUserIdSchema.parse({ id });
    const { enrolLtiUser } = await deleteEnrolLtiUser(validatedParams.id);

    return NextResponse.json(enrolLtiUser, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
