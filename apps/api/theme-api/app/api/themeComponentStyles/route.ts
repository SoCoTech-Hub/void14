import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createThemeComponentStyle,
  deleteThemeComponentStyle,
  updateThemeComponentStyle,
} from "../../../lib/api/themeComponentStyles/mutations";
import {
  insertThemeComponentStyleParams,
  themeComponentStyleIdSchema,
  updateThemeComponentStyleParams,
} from "../../../lib/db/schema/themeComponentStyles";

export async function POST(req: Request) {
  try {
    const validatedData = insertThemeComponentStyleParams.parse(
      await req.json(),
    );
    const { themeComponentStyle } =
      await createThemeComponentStyle(validatedData);

    revalidatePath("/themeComponentStyles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(themeComponentStyle, { status: 201 });
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

    const validatedData = updateThemeComponentStyleParams.parse(
      await req.json(),
    );
    const validatedParams = themeComponentStyleIdSchema.parse({ id });

    const { themeComponentStyle } = await updateThemeComponentStyle(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(themeComponentStyle, { status: 200 });
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

    const validatedParams = themeComponentStyleIdSchema.parse({ id });
    const { themeComponentStyle } = await deleteThemeComponentStyle(
      validatedParams.id,
    );

    return NextResponse.json(themeComponentStyle, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
