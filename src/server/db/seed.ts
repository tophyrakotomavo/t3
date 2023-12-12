import {
  drizzle,
} from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";
import * as schema from "./schema";
import { hashPassword } from "../../utils/hashPassword";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const db = drizzle(new Client({ url: process.env.DATABASE_URL }).connection(), {
  schema,
});

const main = async () => {
  const hashedPassword = await hashPassword(process.env.DEFAULT_USER_EMAIL ?? '');
  await db.insert(schema.users).values({
    email: process.env.DEFAULT_PASSWORD_EMAIL ?? '',
    password: hashedPassword,
    role: "ADMIN",
  });
};

void main();
