import { SiteHeader } from "@/components/site-header";
import Layout from "../Layout";
import { TenantService } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { useQuery } from "@connectrpc/connect-query";
import { DataTable } from "@/components/tenants/tenant-table";

export default function TenantList() {
  const { data } = useQuery(TenantService.method.list);

  return (
    <Layout>
      <SiteHeader title="Tenant List" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6 lg:p-8">
          {data && data.tenants.length > 0 ? (
            <DataTable data={data.tenants} />
          ) : (
            <p>No tenants found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
