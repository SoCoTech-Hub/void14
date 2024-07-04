import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPortfolioLog,
  deletePortfolioLog,
  updatePortfolioLog,
} from "../../../lib/api/portfolioLogs/mutations";
import {
  insertPortfolioLogParams,
  portfolioLogIdSchema,
  updatePortfolioLogParams,
} from "../../../lib/db/schema/portfolioLogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertPortfolioLogParams.parse(await req.json());
    const { portfolioLog } = await createPortfolioLog(validatedData);

    revalidatePath("/portfolioLogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(portfolioLog, { status: 201 });
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

    const validatedData = updatePortfolioLogParams.parse(await req.json());
    const validatedParams = portfolioLogIdSchema.parse({ id });

    const { portfolioLog } = await updatePortfolioLog(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(portfolioLog, { status: 200 });
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

    const validatedParams = portfolioLogIdSchema.parse({ id });
    const { portfolioLog } = await deletePortfolioLog(validatedParams.id);

    return NextResponse.json(portfolioLog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
