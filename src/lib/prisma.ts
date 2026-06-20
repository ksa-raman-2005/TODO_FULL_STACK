import { PrismaClient } from '@/src/generated'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

let connectionString = process.env.DATABASE_URL;
if (connectionString) {
  // Strip channel_binding=require which fails on serverless platforms
  connectionString = connectionString.replace(/&?channel_binding=require/, '');
}

const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Prevent multiple instances of Prisma Client in development / serverless hot-reloads
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;