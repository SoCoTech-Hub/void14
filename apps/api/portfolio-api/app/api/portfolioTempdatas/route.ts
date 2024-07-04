import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPortfolioTempdata,
  deletePortfolioTempdata,
  updatePortfolioTempdata,
} from "../../../lib/api/portfolioTempdatas/mutations";
import {
  insertPortfolioTempdataParams,
  portfolioTempdataIdSchema,
  updatePortfolioTempdataParams,
} from "../../../lib/db/schema/portfolioTempdatas";

export async function POST(req: Request) {
  try {
    const validatedData = insertPortfolioTempdataParams.parse(await req.json());
    const { portfolioTempdata } = await createPortfolioTempdata(validatedData);

    revalidatePath("/portfolioTempdatas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(portfolioTempdata, { status: 201 });
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

    const validatedData = updatePortfolioTempdataParams.parse(await req.json());
    const validatedParams = portfolioTempdataIdSchema.parse({ id });

    const { portfolioTempdata } = await updatePortfolioTempdata(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(portfolioTempdata, { status: 200 });
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

    const validatedParams = portfolioTempdataIdSchema.parse({ id });
    const { portfolioTempdata } = await deletePortfolioTempdata(
      validatedParams.id,
    );

    return NextResponse.json(portfolioTempdata, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
