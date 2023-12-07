import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { filesRemoveService } from "@/services/files/filesRemoveService";
import z from "zod";

export const filesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.files.findMany();
  }),
  remove: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(filesRemoveService),
});
