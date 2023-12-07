import { type AppType } from "next/app";
import Head from "next/head";
import { api } from "@/utils/api";
import { SessionProvider } from "next-auth/react";
import { TopNavigation } from "@/components/topNavigation/TopNavigation";
import { useRouter } from "next/router";
import "@uploadthing/react/styles.css";
import "@/styles/globals.css";
import { type Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
   Component, 
   pageProps: { session, ...pageProps }, 
}) => { const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Revly App - Admin</title>
        <meta name="description" content="Revly App - Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-[#F9FAFB]">
        <div className="m-2">
          {pathname === "/" ? null : <TopNavigation />}
        </div>
        <div className="container flex w-full gap-3">
          <div className="w-full">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
