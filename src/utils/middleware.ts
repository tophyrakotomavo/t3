import { getServerAuthSession } from "@/server/auth";
import {
  type GetServerSidePropsContext,
  type GetServerSidePropsResult,
} from "next";

const rejectionHandler = (message: string, destination = "/") => ({
  redirect: {
    destination: `${destination}?${message && `message=${message}`}`,
    permanent: false,
  },
});

export const userGuard =
  <T>(
    callback?: (
      arg: GetServerSidePropsContext,
    ) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>,
  ) =>
  async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<T>> => {
    const session = await getServerAuthSession(ctx);
    
    if (!session) {
      return rejectionHandler("Not authentified");
    }

    if (!callback) {
      return ({ props: {} as T });
    }

    return callback(ctx);
  };

  export const adminGuard =
  <T>(
    callback?: (
      arg: GetServerSidePropsContext,
    ) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>,
  ) =>
  async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<T>> => {
    const session = await getServerAuthSession(ctx);
    
    if (!session) {
      return rejectionHandler("Not authentified");
    }

    const { user } = {...session};
    const admin = user.role === "ADMIN";

    if(!admin){
      return rejectionHandler("Not found", "/files")
    }

    if (!callback) {
      return ({ props: {} as T });
    }

    return callback(ctx);
  };
