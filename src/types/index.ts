import { type DB } from "@/server/db";

export type SegmentedParams<T> = {
  ctx: {
    db: DB;
  };
  input: T
};
