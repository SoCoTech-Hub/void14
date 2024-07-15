import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSticker,
  deleteSticker,
  updateSticker,
} from "@soco/stickers-api/stickers/mutations";
import { 
  stickerIdSchema,
  insertStickerParams,
  updateStickerParams 
} from "@soco/stickers-db/schema/stickers";

export async function POST(req: Request) {
  try {
    const validatedData = insertStickerParams.parse(await req.json());
    const { sticker } = await createSticker(validatedData);

    revalidatePath("/stickers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(sticker, { status: 201 });
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

    const validatedData = updateStickerParams.parse(await req.json());
    const validatedParams = stickerIdSchema.parse({ id });

    const { sticker } = await updateSticker(validatedParams.id, validatedData);

    return NextResponse.json(sticker, { status: 200 });
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

    const validatedParams = stickerIdSchema.parse({ id });
    const { sticker } = await deleteSticker(validatedParams.id);

    return NextResponse.json(sticker, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
