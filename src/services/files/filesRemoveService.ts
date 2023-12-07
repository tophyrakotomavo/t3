import type { SegmentedParams } from "@/types";
import { files } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const filesRemoveService = async ({
  ctx,
  input,
}: SegmentedParams<{ id: number }>) => {
  const file = await ctx.db.delete(files).where(eq(files.id, input.id));

  return file;
};
