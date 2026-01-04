import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const notes = await prisma.diaryEntry.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({
      data: notes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar notas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const { content, date } = await request.json();
    const note = await prisma.diaryEntry.create({
      data: {
        content,
        date: new Date(date),
        userId: session.user.id,
        title: `Diário - ${new Date(date).toLocaleDateString("pt-BR")}`,
      },
    });

    return NextResponse.json({
      message: "Nota criada com sucesso",
      data: note,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar nota" }, { status: 500 });
  }
}
