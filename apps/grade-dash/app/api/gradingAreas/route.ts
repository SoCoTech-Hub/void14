import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradingArea,
  deleteGradingArea,
  updateGradingArea,
} from "@/lib/api/gradingAreas/mutations";
import { 
  gradingAreaIdSchema,
  insertGradingAreaParams,
  updateGradingAreaParams 
} from "@/lib/db/schema/gradingAreas";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradingAreaParams.parse(await req.json());
    const { gradingArea } = await createGradingArea(validatedData);

    revalidatePath("/gradingAreas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradingArea, { status: 201 });
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

    const validatedData = updateGradingAreaParams.parse(await req.json());
    const validatedParams = gradingAreaIdSchema.parse({ id });

    const { gradingArea } = await updateGradingArea(validatedParams.id, validatedData);

    return NextResponse.json(gradingArea, { status: 200 });
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

    const validatedParams = gradingAreaIdSchema.parse({ id });
    const { gradingArea } = await deleteGradingArea(validatedParams.id);

    return NextResponse.json(gradingArea, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
