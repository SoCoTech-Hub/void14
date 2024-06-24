import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiResourceLink,
  deleteEnrolLtiResourceLink,
  updateEnrolLtiResourceLink,
} from "@/lib/api/enrolLtiResourceLinks/mutations";
import { 
  enrolLtiResourceLinkIdSchema,
  insertEnrolLtiResourceLinkParams,
  updateEnrolLtiResourceLinkParams 
} from "@/lib/db/schema/enrolLtiResourceLinks";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiResourceLinkParams.parse(await req.json());
    const { enrolLtiResourceLink } = await createEnrolLtiResourceLink(validatedData);

    revalidatePath("/enrolLtiResourceLinks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiResourceLink, { status: 201 });
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

    const validatedData = updateEnrolLtiResourceLinkParams.parse(await req.json());
    const validatedParams = enrolLtiResourceLinkIdSchema.parse({ id });

    const { enrolLtiResourceLink } = await updateEnrolLtiResourceLink(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiResourceLink, { status: 200 });
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

    const validatedParams = enrolLtiResourceLinkIdSchema.parse({ id });
    const { enrolLtiResourceLink } = await deleteEnrolLtiResourceLink(validatedParams.id);

    return NextResponse.json(enrolLtiResourceLink, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
