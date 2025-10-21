import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const {getUser} = getKindeServerSession();
        const authUser = await getUser();
        if(!authUser){
            return NextResponse.json({error: "Não autorizado"}, {status:401});
        }

        const dbUser = await prisma.user.findUnique({
            where:{kindeId: authUser.id},
        })
        if(!dbUser){
            return NextResponse.json([], {status: 200});
        }


        const docs = await prisma.document.findMany({
            where: {userId: dbUser.id},
            orderBy: {createdAt: "desc"},
        })
        return NextResponse.json(docs);
    } catch (err) {
        console.error("[GET /api/documents] Error:", err);
        return NextResponse.json({error: "Falha ao buscar documentos"}, {status: 500});
    }
}