import { Outlet, useMatches } from "react-router";
import { SiteHeader } from "@/components/ui/app-shell/site-header";
import AppLayout from "@/layouts/AppLayout";

export function PageLayout() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title =
    (current?.handle as { title?: string } | undefined)?.title ?? "";
  const withProjectSelector =
    (current?.handle as { withProjectSelector?: boolean } | undefined)
      ?.withProjectSelector ?? false;

  return (
    <AppLayout>
      <SiteHeader title={title} withProjectSelector={withProjectSelector} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </AppLayout>
  );
}
