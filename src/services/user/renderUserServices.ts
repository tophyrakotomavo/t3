
import { users } from "@/server/db/schema";
import { type SegmentedParams } from "@/types";

export const renderUserServices = async ({ ctx }: SegmentedParams<unknown>) => {
  const listUser = await ctx.db.select({
    id: users.id,
    email: users.email,
    Role: users.role
  }).from(users);

  return listUser;
};
