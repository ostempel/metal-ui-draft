import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { PartitionService } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { PartitionsTable } from "@/components/partitions/partitions-table";

export default function PartitionsPage() {
  const { data, isLoading, error } = useQuery(PartitionService.method.list, {});

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading machines" description={error.message} />
    );

  if (!data?.partitions.length) return <NoElementFound />;

  return <PartitionsTable data={data.partitions} />;
}
