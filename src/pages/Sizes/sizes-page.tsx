import { useQuery } from "@connectrpc/connect-query";
import { SizeService } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { SizesTable } from "@/components/sizes/sizes-table";

export default function SizesPage() {
  const { data, isLoading, error } = useQuery(SizeService.method.list, {});

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading sizes" description={error.message} />
    );
  }

  if (!data?.sizes?.length) {
    return <NoElementFound />;
  }

  return <SizesTable data={data.sizes} />;
}
