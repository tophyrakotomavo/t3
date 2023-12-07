import { type Role } from "@/server/db/type";
import { type SegmentedParams } from "@/types";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";

export const updateRoleUserServices = async ({
  ctx,
  input,
}: SegmentedParams<{
  id: number;
  role: Role;
}>) => {
  const roleUser = await ctx.db
    .update(users)
    .set({ role: input.role })
    .where(eq(users.id, input.id));

  return roleUser;
};
