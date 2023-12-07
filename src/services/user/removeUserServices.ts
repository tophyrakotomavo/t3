import { users } from "@/server/db/schema";
import type { SegmentedParams } from "@/types";
import { eq } from "drizzle-orm";

export const removeUserServices = async ({
  ctx, input
}: SegmentedParams<{ id: number }>) => {
  const deletedUser = await ctx.db
    .delete(users)
    .where(eq(users.id, input.id))

  return deletedUser;
};
