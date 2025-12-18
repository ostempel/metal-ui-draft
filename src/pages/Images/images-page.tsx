import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { ImageService } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { ImagesTable } from "@/components/images/images-table";

export default function ImagesPage() {
  const { data, isLoading, error } = useQuery(ImageService.method.list, {});

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading images" description={error.message} />
    );

  if (!data?.images.length) return <NoElementFound />;

  return <ImagesTable data={data.images} />;
}
