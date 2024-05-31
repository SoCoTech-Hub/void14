import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolPaypal,
  deleteEnrolPaypal,
  updateEnrolPaypal,
} from "@/lib/api/enrolPaypals/mutations";
import { 
  enrolPaypalIdSchema,
  insertEnrolPaypalParams,
  updateEnrolPaypalParams 
} from "@/lib/db/schema/enrolPaypals";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolPaypalParams.parse(await req.json());
    const { enrolPaypal } = await createEnrolPaypal(validatedData);

    revalidatePath("/enrolPaypals"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolPaypal, { status: 201 });
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

    const validatedData = updateEnrolPaypalParams.parse(await req.json());
    const validatedParams = enrolPaypalIdSchema.parse({ id });

    const { enrolPaypal } = await updateEnrolPaypal(validatedParams.id, validatedData);

    return NextResponse.json(enrolPaypal, { status: 200 });
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

    const validatedParams = enrolPaypalIdSchema.parse({ id });
    const { enrolPaypal } = await deleteEnrolPaypal(validatedParams.id);

    return NextResponse.json(enrolPaypal, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
