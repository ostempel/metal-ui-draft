import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useQuery } from "@connectrpc/connect-query";
import { HealthService } from "@metal-stack/api/js/metalstack/api/v2/health_pb";

export default function Dashboard() {
  const { data } = useQuery(HealthService.method.get);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              Some sections
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                some chart
                {/* <ChartAreaInteractive /> */}
              </div>
              some table
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
