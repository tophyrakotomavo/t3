import { users } from "@/server/db/schema";
import type { SegmentedParams } from "@/types";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const findByEmailUserServices = async ({
  ctx,
  input,
}: SegmentedParams<{
  email: string;
  password: string;
}>) => {
  /* const user = await ctx.db
    .select()
    .from(users)
    .where(eq(users.email, input.email));

  if (!user?.[0]) return null;

  const verify = await bcrypt.compare(input.password, user[0].password);

  if (!verify) return null;

  return user[0]; */

  const user = await ctx.db.query.users.findFirst({
    where: eq(users.email, input.email),
  });

  if (!user) return null;

  const verify = await bcrypt.compare(input.password, user.password);

  if (!verify) return null;

  return user;
};
