import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { NetworkService } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { NetworksTable } from "@/components/networks/partitions-table";
import { useProject } from "@/providers/ProjectProvider";

export default function NetworksPage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(NetworkService.method.list, {
    project: currentProject.uuid,
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading networks" description={error.message} />
    );

  if (!data?.networks.length) return <NoElementFound />;

  return <NetworksTable data={data.networks} />;
}
