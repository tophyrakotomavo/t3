import type { FC } from "react";
import { Loader } from "@/components/loader/Loader";

export const LoaderWrapper: FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <Loader />
  </div>
);
