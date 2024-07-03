import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createPortfolioInstanceConfig,
  deletePortfolioInstanceConfig,
  updatePortfolioInstanceConfig,
} from "@/lib/api/portfolioInstanceConfigs/mutations";
import { 
  portfolioInstanceConfigIdSchema,
  insertPortfolioInstanceConfigParams,
  updatePortfolioInstanceConfigParams 
} from "@/lib/db/schema/portfolioInstanceConfigs";

export async function POST(req: Request) {
  try {
    const validatedData = insertPortfolioInstanceConfigParams.parse(await req.json());
    const { portfolioInstanceConfig } = await createPortfolioInstanceConfig(validatedData);

    revalidatePath("/portfolioInstanceConfigs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(portfolioInstanceConfig, { status: 201 });
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

    const validatedData = updatePortfolioInstanceConfigParams.parse(await req.json());
    const validatedParams = portfolioInstanceConfigIdSchema.parse({ id });

    const { portfolioInstanceConfig } = await updatePortfolioInstanceConfig(validatedParams.id, validatedData);

    return NextResponse.json(portfolioInstanceConfig, { status: 200 });
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

    const validatedParams = portfolioInstanceConfigIdSchema.parse({ id });
    const { portfolioInstanceConfig } = await deletePortfolioInstanceConfig(validatedParams.id);

    return NextResponse.json(portfolioInstanceConfig, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
