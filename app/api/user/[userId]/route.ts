import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = await auth();
    const { point } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!point)
      return new NextResponse("Point to update is required", { status: 400 });

    const user = prisma.user.update({
      where: { userId: params.userId },
      data: { point },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("User point update error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const user = prisma.user.findUnique({
      where: { userId: params.userId },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("User point update error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
