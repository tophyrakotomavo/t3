import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import {
  findByEmailUserServices,
  createUserServices,
  renderUserServices,
  removeUserServices,
  updateRoleUserServices,
} from "@/services";
import { credentialsSchemas, idSchemas } from "@/validator";

export const usersRouter = createTRPCRouter({
  verifyUser: publicProcedure
    .input(credentialsSchemas)
    .mutation(findByEmailUserServices),
  addUser: publicProcedure
    .input(credentialsSchemas )
    .mutation(createUserServices),
  getAllUsers: publicProcedure.query(renderUserServices),
  remove: publicProcedure
    .input(idSchemas)
    .mutation(removeUserServices),
  changeRole: publicProcedure
    .input(
      z.object({
        id: z.number(),
        role: z.enum(["USER", "ADMIN", "READ"]),
      })
    )
    .mutation(updateRoleUserServices),
});
