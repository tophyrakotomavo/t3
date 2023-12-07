import { type InferSelectModel } from 'drizzle-orm';
import type * as schema from './schema';

export type Role = typeof schema.RoleEnum._.data;
export type User = InferSelectModel<typeof schema.users>; 
