import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolFlatfile,
  deleteEnrolFlatfile,
  updateEnrolFlatfile,
} from "@soco/enrol-api/enrolFlatfiles/mutations";
import { 
  enrolFlatfileIdSchema,
  insertEnrolFlatfileParams,
  updateEnrolFlatfileParams 
} from "@soco/enrol-db/schema/enrolFlatfiles";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolFlatfileParams.parse(await req.json());
    const { enrolFlatfile } = await createEnrolFlatfile(validatedData);

    revalidatePath("/enrolFlatfiles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolFlatfile, { status: 201 });
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

    const validatedData = updateEnrolFlatfileParams.parse(await req.json());
    const validatedParams = enrolFlatfileIdSchema.parse({ id });

    const { enrolFlatfile } = await updateEnrolFlatfile(validatedParams.id, validatedData);

    return NextResponse.json(enrolFlatfile, { status: 200 });
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

    const validatedParams = enrolFlatfileIdSchema.parse({ id });
    const { enrolFlatfile } = await deleteEnrolFlatfile(validatedParams.id);

    return NextResponse.json(enrolFlatfile, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
