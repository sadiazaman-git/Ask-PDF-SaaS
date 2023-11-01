// this config.ts is going to hold drizzle configurations on how we want to tell drizzle where our schema files live in

import type { Config } from "drizzle-kit"; //will give us some type annotation for configuration object
import * as dotenv from "dotenv";
dotenv.config({path:'.env'})

// this object make sure that it'll satisfy confi
export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// npx drizzle-kit push:pg  <= this will take a look at our schema and make sure that out database in neon is synced up with our schema
