import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config({ path: `.env.local` })

console.log(process.env.NODE_ENV)

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  connectionString: process.env.DATABASE_URL,
} satisfies Config
