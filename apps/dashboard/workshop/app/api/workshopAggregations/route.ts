import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopAggregation,
  deleteWorkshopAggregation,
  updateWorkshopAggregation,
} from "@soco/workshop-api/workshopAggregations/mutations";
import { 
  workshopAggregationIdSchema,
  insertWorkshopAggregationParams,
  updateWorkshopAggregationParams 
} from "@soco/workshop-db/schema/workshopAggregations";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopAggregationParams.parse(await req.json());
    const { workshopAggregation } = await createWorkshopAggregation(validatedData);

    revalidatePath("/workshopAggregations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopAggregation, { status: 201 });
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

    const validatedData = updateWorkshopAggregationParams.parse(await req.json());
    const validatedParams = workshopAggregationIdSchema.parse({ id });

    const { workshopAggregation } = await updateWorkshopAggregation(validatedParams.id, validatedData);

    return NextResponse.json(workshopAggregation, { status: 200 });
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

    const validatedParams = workshopAggregationIdSchema.parse({ id });
    const { workshopAggregation } = await deleteWorkshopAggregation(validatedParams.id);

    return NextResponse.json(workshopAggregation, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
