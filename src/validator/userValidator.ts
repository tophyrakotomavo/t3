import { z } from "zod";

export const credentialsSchemas =  z.object({
  email: z.string().email(),
  password: z.string(),
});
export const idSchemas = z.object({ id: z.number() });
export const emailSchemas = z.object({ email: z.string() });
