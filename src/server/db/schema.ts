import {
  mysqlTable,
  primaryKey,
  varchar,
  int,
  datetime,
  unique,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const RoleEnum = mysqlEnum("role", ["ADMIN", "USER", "READ"]);

export const files = mysqlTable(
  "Files",
  {
    id: int("id").autoincrement().notNull(),
    url: varchar("url", { length: 191 }).notNull(),
    key: varchar("key", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    size: int("size").notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
  },
  (table) => {
    return {
      filesId: primaryKey(table.id),
    };
  },
);

export const users = mysqlTable(
  "Users",
  {
    id: int("id").autoincrement().notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
			.default(sql`CURRENT_TIMESTAMP(3)`),
    role: RoleEnum.default("USER").notNull(),
  },
  (table) => {
    return {
      usersId: primaryKey(table.id),
      usersEmailKey: unique("Users_email_key").on(table.email),
    };
  },
);

export { mysqlTable };
