import { Client } from "@planetscale/database";
import {
  type PlanetScaleDatabase,
  drizzle,
} from "drizzle-orm/planetscale-serverless";

import { env } from "@/env";
import * as schema from "./schema";

export type DB = PlanetScaleDatabase<typeof schema>

export const db: DB = drizzle(new Client({ url: env.DATABASE_URL }).connection(), {
  schema,
});
