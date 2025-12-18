import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { FilesystemService } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { FilesystemsTable } from "@/components/filesystem/filesystems-table";

export default function FilesystemsPage() {
  const { data, isLoading, error } = useQuery(
    FilesystemService.method.list,
    {}
  );

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint
        title="Error loading filesystems"
        description={error.message}
      />
    );

  if (!data?.filesystemLayouts.length) return <NoElementFound />;

  return <FilesystemsTable data={data.filesystemLayouts} />;
}
