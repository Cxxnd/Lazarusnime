import { PrismaClient } from "../../prisma/generated";
import { PrismaPg } from "@prisma/adapter-pg";

// Membaca URL bawaan dari Vercel Environment Variables
let databaseUrl = process.env.DATABASE_URL || "";

// Mengganti sslmode=require menjadi sslmode=verify-full secara otomatis lewat kode sebelum dibaca driver
if (databaseUrl.includes("sslmode=require")) {
    databaseUrl = databaseUrl.replace("sslmode=require", "sslmode=verify-full");
}

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
