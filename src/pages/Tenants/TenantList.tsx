import NoElementFound from "@/components/no-element-found/no-element-found";
import { SiteHeader } from "@/components/site-header";
import { TenantTable } from "@/components/tenants/tenant-table";
import { useQuery } from "@connectrpc/connect-query";
import { TenantService } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import Layout from "../Layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function TenantList() {
  const { data, isLoading, error } = useQuery(TenantService.method.list);

  return (
    <Layout>
      <SiteHeader title="Tenant List" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6 lg:p-8">
          {!isLoading && <Skeleton className="h-20" />}
          {data && data.tenants.length > 0 ? (
            <TenantTable data={data.tenants} />
          ) : (
            <NoElementFound />
          )}
        </div>
      </div>
    </Layout>
  );
}
