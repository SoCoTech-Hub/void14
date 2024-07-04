import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPortfolioInstanceUser,
  deletePortfolioInstanceUser,
  updatePortfolioInstanceUser,
} from "../../../lib/api/portfolioInstanceUsers/mutations";
import {
  insertPortfolioInstanceUserParams,
  portfolioInstanceUserIdSchema,
  updatePortfolioInstanceUserParams,
} from "../../../lib/db/schema/portfolioInstanceUsers";

export async function POST(req: Request) {
  try {
    const validatedData = insertPortfolioInstanceUserParams.parse(
      await req.json(),
    );
    const { portfolioInstanceUser } =
      await createPortfolioInstanceUser(validatedData);

    revalidatePath("/portfolioInstanceUsers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(portfolioInstanceUser, { status: 201 });
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

    const validatedData = updatePortfolioInstanceUserParams.parse(
      await req.json(),
    );
    const validatedParams = portfolioInstanceUserIdSchema.parse({ id });

    const { portfolioInstanceUser } = await updatePortfolioInstanceUser(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(portfolioInstanceUser, { status: 200 });
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

    const validatedParams = portfolioInstanceUserIdSchema.parse({ id });
    const { portfolioInstanceUser } = await deletePortfolioInstanceUser(
      validatedParams.id,
    );

    return NextResponse.json(portfolioInstanceUser, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
