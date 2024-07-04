import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createReportbuilderAudience,
  deleteReportbuilderAudience,
  updateReportbuilderAudience,
} from "../../../lib/api/reportbuilderAudiences/mutations";
import {
  insertReportbuilderAudienceParams,
  reportbuilderAudienceIdSchema,
  updateReportbuilderAudienceParams,
} from "../../../lib/db/schema/reportbuilderAudiences";

export async function POST(req: Request) {
  try {
    const validatedData = insertReportbuilderAudienceParams.parse(
      await req.json(),
    );
    const { reportbuilderAudience } =
      await createReportbuilderAudience(validatedData);

    revalidatePath("/reportbuilderAudiences"); // optional - assumes you will have named route same as entity

    return NextResponse.json(reportbuilderAudience, { status: 201 });
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

    const validatedData = updateReportbuilderAudienceParams.parse(
      await req.json(),
    );
    const validatedParams = reportbuilderAudienceIdSchema.parse({ id });

    const { reportbuilderAudience } = await updateReportbuilderAudience(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(reportbuilderAudience, { status: 200 });
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

    const validatedParams = reportbuilderAudienceIdSchema.parse({ id });
    const { reportbuilderAudience } = await deleteReportbuilderAudience(
      validatedParams.id,
    );

    return NextResponse.json(reportbuilderAudience, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
