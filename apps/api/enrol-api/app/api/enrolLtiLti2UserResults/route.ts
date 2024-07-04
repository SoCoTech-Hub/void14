import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createEnrolLtiLti2UserResult,
  deleteEnrolLtiLti2UserResult,
  updateEnrolLtiLti2UserResult,
} from "../../../lib/api/enrolLtiLti2UserResults/mutations";
import {
  enrolLtiLti2UserResultIdSchema,
  insertEnrolLtiLti2UserResultParams,
  updateEnrolLtiLti2UserResultParams,
} from "../../../lib/db/schema/enrolLtiLti2UserResults";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiLti2UserResultParams.parse(
      await req.json(),
    );
    const { enrolLtiLti2UserResult } =
      await createEnrolLtiLti2UserResult(validatedData);

    revalidatePath("/enrolLtiLti2UserResults"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiLti2UserResult, { status: 201 });
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

    const validatedData = updateEnrolLtiLti2UserResultParams.parse(
      await req.json(),
    );
    const validatedParams = enrolLtiLti2UserResultIdSchema.parse({ id });

    const { enrolLtiLti2UserResult } = await updateEnrolLtiLti2UserResult(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(enrolLtiLti2UserResult, { status: 200 });
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

    const validatedParams = enrolLtiLti2UserResultIdSchema.parse({ id });
    const { enrolLtiLti2UserResult } = await deleteEnrolLtiLti2UserResult(
      validatedParams.id,
    );

    return NextResponse.json(enrolLtiLti2UserResult, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
