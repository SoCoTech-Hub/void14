import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createStatsMonthly,
  deleteStatsMonthly,
  updateStatsMonthly,
} from "@/lib/api/statsMonthlies/mutations";
import { 
  statsMonthlyIdSchema,
  insertStatsMonthlyParams,
  updateStatsMonthlyParams 
} from "@/lib/db/schema/statsMonthlies";

export async function POST(req: Request) {
  try {
    const validatedData = insertStatsMonthlyParams.parse(await req.json());
    const { statsMonthly } = await createStatsMonthly(validatedData);

    revalidatePath("/statsMonthlies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(statsMonthly, { status: 201 });
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

    const validatedData = updateStatsMonthlyParams.parse(await req.json());
    const validatedParams = statsMonthlyIdSchema.parse({ id });

    const { statsMonthly } = await updateStatsMonthly(validatedParams.id, validatedData);

    return NextResponse.json(statsMonthly, { status: 200 });
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

    const validatedParams = statsMonthlyIdSchema.parse({ id });
    const { statsMonthly } = await deleteStatsMonthly(validatedParams.id);

    return NextResponse.json(statsMonthly, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
