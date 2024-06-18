import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createReportbuilderFilter,
  deleteReportbuilderFilter,
  updateReportbuilderFilter,
} from "@/lib/api/reportbuilderFilters/mutations";
import { 
  reportbuilderFilterIdSchema,
  insertReportbuilderFilterParams,
  updateReportbuilderFilterParams 
} from "@/lib/db/schema/reportbuilderFilters";

export async function POST(req: Request) {
  try {
    const validatedData = insertReportbuilderFilterParams.parse(await req.json());
    const { reportbuilderFilter } = await createReportbuilderFilter(validatedData);

    revalidatePath("/reportbuilderFilters"); // optional - assumes you will have named route same as entity

    return NextResponse.json(reportbuilderFilter, { status: 201 });
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

    const validatedData = updateReportbuilderFilterParams.parse(await req.json());
    const validatedParams = reportbuilderFilterIdSchema.parse({ id });

    const { reportbuilderFilter } = await updateReportbuilderFilter(validatedParams.id, validatedData);

    return NextResponse.json(reportbuilderFilter, { status: 200 });
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

    const validatedParams = reportbuilderFilterIdSchema.parse({ id });
    const { reportbuilderFilter } = await deleteReportbuilderFilter(validatedParams.id);

    return NextResponse.json(reportbuilderFilter, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
