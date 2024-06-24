import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createPortfolioMaharaQueue,
  deletePortfolioMaharaQueue,
  updatePortfolioMaharaQueue,
} from "@/lib/api/portfolioMaharaQueues/mutations";
import { 
  portfolioMaharaQueueIdSchema,
  insertPortfolioMaharaQueueParams,
  updatePortfolioMaharaQueueParams 
} from "@/lib/db/schema/portfolioMaharaQueues";

export async function POST(req: Request) {
  try {
    const validatedData = insertPortfolioMaharaQueueParams.parse(await req.json());
    const { portfolioMaharaQueue } = await createPortfolioMaharaQueue(validatedData);

    revalidatePath("/portfolioMaharaQueues"); // optional - assumes you will have named route same as entity

    return NextResponse.json(portfolioMaharaQueue, { status: 201 });
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

    const validatedData = updatePortfolioMaharaQueueParams.parse(await req.json());
    const validatedParams = portfolioMaharaQueueIdSchema.parse({ id });

    const { portfolioMaharaQueue } = await updatePortfolioMaharaQueue(validatedParams.id, validatedData);

    return NextResponse.json(portfolioMaharaQueue, { status: 200 });
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

    const validatedParams = portfolioMaharaQueueIdSchema.parse({ id });
    const { portfolioMaharaQueue } = await deletePortfolioMaharaQueue(validatedParams.id);

    return NextResponse.json(portfolioMaharaQueue, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
