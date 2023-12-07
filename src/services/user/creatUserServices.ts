import { users } from "@/server/db/schema";
import type { SegmentedParams } from "@/types";
import { hashPassword } from "@/utils/hashPassword";

export const createUserServices = async ({
  ctx,
  input,
}: SegmentedParams<{
  email: string;
  password: string;
}>) => {
  const hashedPassword = await hashPassword(input.password);

  const user = ctx.db.insert(users).values({
    email: input.email,
    password: hashedPassword,
  });

  return user;
};
