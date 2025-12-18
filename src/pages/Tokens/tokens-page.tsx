import NoElementFound from "@/components/ui/no-element-found/no-element-found";
import { useQuery } from "@connectrpc/connect-query";
import { TokenService } from "@metal-stack/api/js/metalstack/api/v2/token_pb";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import AlertHint from "@/components/ui/alert/AlertHint";
import { TokensTable } from "@/components/tokens/tokens-table";

export default function TokensPage() {
  const { data, isLoading, error } = useQuery(TokenService.method.list);

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <AlertHint title="Error loading tokens" description={error.message} />
    );

  if (!data?.tokens.length) return <NoElementFound />;

  return <TokensTable data={data.tokens} />;
}
