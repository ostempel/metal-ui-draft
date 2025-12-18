import NoElementFound from "@/components/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { MachineService } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import LoadingScreen from "@/components/loading-screen/loading-screen";
import AlertHint from "@/components/alert/AlertHint";
import { MachinesTable } from "@/components/machines/machines-table";

export default function MachinesPage() {
  const { data, isLoading, error } = useQuery(MachineService.method.list);

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading machines" description={error.message} />
    );

  if (!data?.machines.length) return <NoElementFound />;

  return <MachinesTable data={data.machines} />;
}
