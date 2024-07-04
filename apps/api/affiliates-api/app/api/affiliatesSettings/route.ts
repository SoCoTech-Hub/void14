import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAffiliatesSetting,
  deleteAffiliatesSetting,
  updateAffiliatesSetting,
} from "../../../lib/api/affiliatesSettings/mutations";
import {
  affiliatesSettingIdSchema,
  insertAffiliatesSettingParams,
  updateAffiliatesSettingParams,
} from "../../../lib/db/schema/affiliatesSettings";

export async function POST(req: Request) {
  try {
    const validatedData = insertAffiliatesSettingParams.parse(await req.json());
    const { affiliatesSetting } = await createAffiliatesSetting(validatedData);

    revalidatePath("/affiliatesSettings"); // optional - assumes you will have named route same as entity

    return NextResponse.json(affiliatesSetting, { status: 201 });
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

    const validatedData = updateAffiliatesSettingParams.parse(await req.json());
    const validatedParams = affiliatesSettingIdSchema.parse({ id });

    const { affiliatesSetting } = await updateAffiliatesSetting(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(affiliatesSetting, { status: 200 });
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

    const validatedParams = affiliatesSettingIdSchema.parse({ id });
    const { affiliatesSetting } = await deleteAffiliatesSetting(
      validatedParams.id,
    );

    return NextResponse.json(affiliatesSetting, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
