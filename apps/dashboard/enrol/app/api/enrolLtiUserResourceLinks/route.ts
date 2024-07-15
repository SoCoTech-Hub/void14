import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiUserResourceLink,
  deleteEnrolLtiUserResourceLink,
  updateEnrolLtiUserResourceLink,
} from "@soco/enrol-api/enrolLtiUserResourceLinks/mutations";
import { 
  enrolLtiUserResourceLinkIdSchema,
  insertEnrolLtiUserResourceLinkParams,
  updateEnrolLtiUserResourceLinkParams 
} from "@soco/enrol-db/schema/enrolLtiUserResourceLinks";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiUserResourceLinkParams.parse(await req.json());
    const { enrolLtiUserResourceLink } = await createEnrolLtiUserResourceLink(validatedData);

    revalidatePath("/enrolLtiUserResourceLinks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiUserResourceLink, { status: 201 });
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

    const validatedData = updateEnrolLtiUserResourceLinkParams.parse(await req.json());
    const validatedParams = enrolLtiUserResourceLinkIdSchema.parse({ id });

    const { enrolLtiUserResourceLink } = await updateEnrolLtiUserResourceLink(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiUserResourceLink, { status: 200 });
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

    const validatedParams = enrolLtiUserResourceLinkIdSchema.parse({ id });
    const { enrolLtiUserResourceLink } = await deleteEnrolLtiUserResourceLink(validatedParams.id);

    return NextResponse.json(enrolLtiUserResourceLink, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
