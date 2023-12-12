import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { filesCreateServices } from "@/services/files/filesCreateServices";
import { getServerAuthSession } from "./auth";
import { db } from "./db";
 
const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" }, pdf: { maxFileSize: "4MB" }, "text/csv": { maxFileSize: "4MB" } })
    .middleware(async (ctx) => {
     const session = await getServerAuthSession(ctx);

      if (!session) throw new Error('Unauthorized');

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      await filesCreateServices({ ctx: { db }, input: { name: file.name, url: file.url, size: file.size, key: file.key }});
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;