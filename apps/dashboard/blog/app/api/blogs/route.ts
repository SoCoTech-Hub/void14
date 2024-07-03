import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "@/lib/api/blogs/mutations";
import { 
  blogIdSchema,
  insertBlogParams,
  updateBlogParams 
} from "@/lib/db/schema/blogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertBlogParams.parse(await req.json());
    const { blog } = await createBlog(validatedData);

    revalidatePath("/blogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(blog, { status: 201 });
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

    const validatedData = updateBlogParams.parse(await req.json());
    const validatedParams = blogIdSchema.parse({ id });

    const { blog } = await updateBlog(validatedParams.id, validatedData);

    return NextResponse.json(blog, { status: 200 });
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

    const validatedParams = blogIdSchema.parse({ id });
    const { blog } = await deleteBlog(validatedParams.id);

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
