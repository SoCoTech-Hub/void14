import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScormScoesData,
  deleteScormScoesData,
  updateScormScoesData,
} from "../../../lib/api/scormScoesDatas/mutations";
import {
  insertScormScoesDataParams,
  scormScoesDataIdSchema,
  updateScormScoesDataParams,
} from "../../../lib/db/schema/scormScoesDatas";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormScoesDataParams.parse(await req.json());
    const { scormScoesData } = await createScormScoesData(validatedData);

    revalidatePath("/scormScoesDatas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormScoesData, { status: 201 });
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

    const validatedData = updateScormScoesDataParams.parse(await req.json());
    const validatedParams = scormScoesDataIdSchema.parse({ id });

    const { scormScoesData } = await updateScormScoesData(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scormScoesData, { status: 200 });
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

    const validatedParams = scormScoesDataIdSchema.parse({ id });
    const { scormScoesData } = await deleteScormScoesData(validatedParams.id);

    return NextResponse.json(scormScoesData, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
