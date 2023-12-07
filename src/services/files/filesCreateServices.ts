import { files } from "@/server/db/schema";
import { type SegmentedParams } from "@/types";

export const filesCreateServices = async ({
  ctx,
  input,
}: SegmentedParams<{
  name: string;
  url: string;
  size: number;
  key: string;
}>) => {
  try {
    const file = await ctx.db.insert(files).values({
      key: input.key,
      name: input.name,
      url: input.url,
      size: input.size,
    })
    return file;
  } catch (error) {
    console.error("filesCreateServices =>", error);
    return null;
  }
};
