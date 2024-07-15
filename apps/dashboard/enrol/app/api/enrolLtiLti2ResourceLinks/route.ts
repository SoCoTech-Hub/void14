import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiLti2ResourceLink,
  deleteEnrolLtiLti2ResourceLink,
  updateEnrolLtiLti2ResourceLink,
} from "@soco/enrol-api/enrolLtiLti2ResourceLinks/mutations";
import { 
  enrolLtiLti2ResourceLinkIdSchema,
  insertEnrolLtiLti2ResourceLinkParams,
  updateEnrolLtiLti2ResourceLinkParams 
} from "@soco/enrol-db/schema/enrolLtiLti2ResourceLinks";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiLti2ResourceLinkParams.parse(await req.json());
    const { enrolLtiLti2ResourceLink } = await createEnrolLtiLti2ResourceLink(validatedData);

    revalidatePath("/enrolLtiLti2ResourceLinks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiLti2ResourceLink, { status: 201 });
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

    const validatedData = updateEnrolLtiLti2ResourceLinkParams.parse(await req.json());
    const validatedParams = enrolLtiLti2ResourceLinkIdSchema.parse({ id });

    const { enrolLtiLti2ResourceLink } = await updateEnrolLtiLti2ResourceLink(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiLti2ResourceLink, { status: 200 });
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

    const validatedParams = enrolLtiLti2ResourceLinkIdSchema.parse({ id });
    const { enrolLtiLti2ResourceLink } = await deleteEnrolLtiLti2ResourceLink(validatedParams.id);

    return NextResponse.json(enrolLtiLti2ResourceLink, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
