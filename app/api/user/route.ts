import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, point, imageUrl, userId } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!name) return new NextResponse("Name is required.", { status: 400 });
    if (point == null)
      return new NextResponse("Point is required.", { status: 400 });

    const exsitingUser = await prisma.user.findUnique({ where: { userId } });

    if (exsitingUser) {
      const user = await prisma.user.update({
        where: { userId },
        data: {
          point: exsitingUser.point + point,
        },
      });
      return NextResponse.json(user);
    } else {
      const user = await prisma.user.create({
        data: {
          userId,
          name,
          point,
          imageUrl,
        },
      });
      return NextResponse.json(user);
    }
  } catch (error) {
    console.log("User post error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { point: "desc" },
      take: 10,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("User get error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
