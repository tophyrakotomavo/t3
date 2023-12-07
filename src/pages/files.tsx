import type { NextPage } from "next";
import { UploadDropzone } from "@/utils/uploadthing";
import { api } from "@/utils/api";
import { LoaderWrapper } from "@/components/loaderWrapper/LoaderWrapper";
import { FileCard } from "@/components/fileCard/FileCard";
import { userGuard } from "@/utils/middleware";

export const getServerSideProps = userGuard();


const Files: NextPage = () => {
  const { data, isLoading } = api.files.getAll.useQuery();

  const { mutateAsync, isLoading: isProcessing } =
    api.files.remove.useMutation();

  const utils = api.useContext();

  if (isLoading) {
    return <LoaderWrapper />;
  }

  const handleRemove = async (id: number) => {
    await mutateAsync({ id });
    await utils.files.getAll.invalidate();
    await utils.files.getAll.refetch();
  };

  return (
    <div className="grid">
      <div className="mb-5">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={async () => {
            await utils.files.getAll.invalidate();
            alert("Upload Completed");
            await utils.files.getAll.refetch();
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Files Available
      </h2>
      {data && data.length === 0 && !isLoading && (
        <div className="mt-10 flex items-center justify-center text-lg font-bold">
          No files available
        </div>
      )}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {data?.map((d) => (
          <FileCard
            onRemove={handleRemove}
            key={d.id}
            item={d}
            isDeleting={isProcessing}
          />
        ))}
      </div>
    </div>
  );
};

export default Files;
