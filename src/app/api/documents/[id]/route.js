import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();
    if (!authUser)
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: authUser.id },
    });
    if (!dbUser)
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    const doc = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!doc || doc.userId !== dbUser.id) {
      return NextResponse.json({ error: "Não encontrado, tente mais tarde" }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (error) {
    console.error("[GET /api/documents/[id]] Error:", error);
    return NextResponse.json(
      { error: "Falha ao buscar documentos" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();
    if (!authUser)
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: authUser.id },
    });
    if (!dbUser)
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    const doc = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!doc || doc.userId !== dbUser.id) {
      return NextResponse.json({ error: "Não encontrado, tente mais tarde" }, { status: 404 });
    }

    await prisma.document.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/documents/[id]] Error:", error);
    return NextResponse.json(
      { error: "Falha ao buscar documentos" },
      { status: 500 }
    );
  }
}