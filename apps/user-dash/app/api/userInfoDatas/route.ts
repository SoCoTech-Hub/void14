import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUserInfoData,
  deleteUserInfoData,
  updateUserInfoData,
} from "@/lib/api/userInfoDatas/mutations";
import { 
  userInfoDataIdSchema,
  insertUserInfoDataParams,
  updateUserInfoDataParams 
} from "@/lib/db/schema/userInfoDatas";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserInfoDataParams.parse(await req.json());
    const { userInfoData } = await createUserInfoData(validatedData);

    revalidatePath("/userInfoDatas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userInfoData, { status: 201 });
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

    const validatedData = updateUserInfoDataParams.parse(await req.json());
    const validatedParams = userInfoDataIdSchema.parse({ id });

    const { userInfoData } = await updateUserInfoData(validatedParams.id, validatedData);

    return NextResponse.json(userInfoData, { status: 200 });
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

    const validatedParams = userInfoDataIdSchema.parse({ id });
    const { userInfoData } = await deleteUserInfoData(validatedParams.id);

    return NextResponse.json(userInfoData, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
