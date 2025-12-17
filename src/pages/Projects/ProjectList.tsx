import { SiteHeader } from "@/components/site-header";
import Layout from "../Layout";
import { useQuery } from "@connectrpc/connect-query";
import { ProjectService } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { ProjectTable } from "@/components/projects/projects-table";
import NoElementFound from "@/components/no-element-found/no-element-found";

export default function ProjectList() {
  const { data, isLoading, error } = useQuery(ProjectService.method.list);

  return (
    <Layout>
      <SiteHeader title="Project List" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6 lg:p-8">
          {data && data.projects.length > 0 ? (
            <ProjectTable data={data.projects} />
          ) : (
            <NoElementFound />
          )}
        </div>
      </div>
    </Layout>
  );
}
