import { Outlet, useMatches } from "react-router";
import { SiteHeader } from "@/components/site-header";
import Layout from "@/pages/Layout";

export function PageLayout() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title =
    (current?.handle as { title?: string } | undefined)?.title ?? "";

  return (
    <Layout>
      <SiteHeader title={title} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
