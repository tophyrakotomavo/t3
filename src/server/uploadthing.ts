import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
// import { propelauth } from '@/server/propelauth';
import { filesCreateServices } from "@/services/files/filesCreateServices";
 
const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" }, pdf: { maxFileSize: "4MB" }, "text/csv": { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      if (!req.cookies?.userid) throw new Error('Unauthorized');

      /* const res = await propelauth.fetchUserMetadataByUserId(req.cookies?.userid);

      if (!res) throw new Error('Unauthorized'); */
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      await filesCreateServices({ name: file.name, url: file.url, size: file.size, key: file.key });
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;