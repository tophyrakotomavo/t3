import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  item: {
    id: number;
    name: string;
    url: string;
    size: number;
    createdAt: string;
  };
  onRemove: (id: number) => void;
  isDeleting: boolean;
};

export const FileCard: FC<Props> = ({ item, onRemove, isDeleting }) => {
  const { name, url, createdAt, id } = item;

  return (
    <Card className="flex w-[432px] flex-col justify-between">
      <CardHeader>
        <CardTitle className="overflow-hidden text-ellipsis">{name}</CardTitle>
        <CardDescription className="mt-2 break-words">{url}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start justify-between">
        <div className="mb-2 flex gap-2">
          <a href={url} download={name} target="_blank" rel="noreferrer">
            <Button>Download</Button>
          </a>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={() => onRemove(id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Remove"
            )}
          </Button>
        </div>
        <span className="text-end text-xs">
          {new Date(createdAt).toUTCString()}
        </span>
      </CardFooter>
    </Card>
  );
};
