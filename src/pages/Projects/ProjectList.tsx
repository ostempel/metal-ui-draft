import { useQuery } from "@connectrpc/connect-query";
import { ProjectService } from "@metal-stack/api/js/metalstack/api/v2/project_pb";

import LoadingScreen from "@/components/loading-screen/loading-screen";
import AlertHint from "@/components/alert/AlertHint";
import NoElementFound from "@/components/no-element-found/no-element-found";
import { ProjectTable } from "@/components/projects/projects-table";

export default function ProjectList() {
  const { data, isLoading, error } = useQuery(ProjectService.method.list);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading projects" description={error.message} />
    );
  }

  if (!data?.projects?.length) {
    return <NoElementFound />;
  }

  return <ProjectTable data={data.projects} />;
}
