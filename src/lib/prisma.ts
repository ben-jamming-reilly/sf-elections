// app/utils/prisma.server.ts
import { PrismaClient } from "@prisma/client";


let prisma: PrismaClient;
declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient({
      log: ["info", "warn", "error"],
    });
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };