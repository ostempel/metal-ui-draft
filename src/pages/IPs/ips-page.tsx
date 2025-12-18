import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { IPService } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import { useProject } from "@/providers/ProjectProvider";
import AlertHint from "@/components/ui/alert/AlertHint";
import { IpsTable } from "@/components/ips/ips-table";

export default function IPsPage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(IPService.method.list, {
    project: currentProject.uuid,
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading images" description={error.message} />
    );

  if (!data?.ips.length) return <NoElementFound />;

  return <IpsTable data={data.ips} />;
}
