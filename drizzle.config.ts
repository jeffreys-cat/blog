import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config({ path: `.env.local` })

console.log(process.env.NODE_ENV)

export default {
  driver: 'mysql2',
  schema: './db/schema.ts',
  out: './db/migrations',
  dbCredentials: { connectionString: process.env.DATABASE_URL || '' },
} satisfies Config
