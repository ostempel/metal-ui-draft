import AlertHint from "@/components/alert/AlertHint";
import LoadingScreen from "@/components/loading-screen/loading-screen";
import { useQuery } from "@connectrpc/connect-query";
import {
  Project,
  ProjectService,
} from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { createContext, useContext, useEffect, useState } from "react";

type ProjectContextValue = {
  currentProject: Project;
  projects: Project[];
  setCurrentProject: (project: Project) => void;
};

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useQuery(ProjectService.method.list);

  const projects = data?.projects ?? [];
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      setCurrentProject(projects[0]);
    }
  }, [currentProject, projects]);

  if (isLoading && !data) {
    console.log("Loading projects...");
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading projects" description={error.message} />
    );
  }

  if (!currentProject) {
    return (
      <AlertHint
        title="No projects available"
        description="Please create a project to continue."
      />
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        projects,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextValue {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }

  return context;
}
