import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {user, password} = await request.json();
        return NextResponse.json({user: user, password: password})
    }catch(error){
        return NextResponse.json({erro: "Erro interno"}, {status: 500})
    }
}


// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@/generated/prisma/client";
// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

// export async function main() {
//     const allUsers = prisma.usuario.findMany();
//     console.log("All users: ", JSON.stringify(allUsers), null, 2)
// }