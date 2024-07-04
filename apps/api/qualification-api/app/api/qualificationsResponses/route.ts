import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQualificationsResponse,
  deleteQualificationsResponse,
  updateQualificationsResponse,
} from "../../../lib/api/qualificationsResponses/mutations";
import {
  insertQualificationsResponseParams,
  qualificationsResponseIdSchema,
  updateQualificationsResponseParams,
} from "../../../lib/db/schema/qualificationsResponses";

export async function POST(req: Request) {
  try {
    const validatedData = insertQualificationsResponseParams.parse(
      await req.json(),
    );
    const { qualificationsResponse } =
      await createQualificationsResponse(validatedData);

    revalidatePath("/qualificationsResponses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qualificationsResponse, { status: 201 });
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

    const validatedData = updateQualificationsResponseParams.parse(
      await req.json(),
    );
    const validatedParams = qualificationsResponseIdSchema.parse({ id });

    const { qualificationsResponse } = await updateQualificationsResponse(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(qualificationsResponse, { status: 200 });
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

    const validatedParams = qualificationsResponseIdSchema.parse({ id });
    const { qualificationsResponse } = await deleteQualificationsResponse(
      validatedParams.id,
    );

    return NextResponse.json(qualificationsResponse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
