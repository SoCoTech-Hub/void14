import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRating,
  deleteRating,
  updateRating,
} from "@/lib/api/ratings/mutations";
import { 
  ratingIdSchema,
  insertRatingParams,
  updateRatingParams 
} from "@/lib/db/schema/ratings";

export async function POST(req: Request) {
  try {
    const validatedData = insertRatingParams.parse(await req.json());
    const { rating } = await createRating(validatedData);

    revalidatePath("/ratings"); // optional - assumes you will have named route same as entity

    return NextResponse.json(rating, { status: 201 });
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

    const validatedData = updateRatingParams.parse(await req.json());
    const validatedParams = ratingIdSchema.parse({ id });

    const { rating } = await updateRating(validatedParams.id, validatedData);

    return NextResponse.json(rating, { status: 200 });
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

    const validatedParams = ratingIdSchema.parse({ id });
    const { rating } = await deleteRating(validatedParams.id);

    return NextResponse.json(rating, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
