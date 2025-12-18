import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/providers/ThemeProvider";
import { IconHeartRateMonitor, IconMoon, IconSun } from "@tabler/icons-react";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { useQuery } from "@connectrpc/connect-query";
import { HealthService } from "@metal-stack/api/js/metalstack/api/v2/health_pb";
import ServiceHealthItem from "../../health/service-health-item";
import { Select } from "@radix-ui/react-select";
import { useProject } from "@/providers/ProjectProvider";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface SiteHeaderProps {
  title: string;
  withProjectSelector?: boolean;
}

export function SiteHeader({ title, withProjectSelector }: SiteHeaderProps) {
  const { data } = useQuery(HealthService.method.get);
  const projectCtx = useProject();

  const { theme, setTheme } = useTheme();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        {withProjectSelector && (
          <Select
            value={projectCtx.currentProject.uuid}
            onValueChange={(value) =>
              projectCtx.setCurrentProject(
                projectCtx.projects.find((p) => p.uuid === value)!
              )
            }
          >
            <SelectTrigger id="rows-per-page" size="sm" className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {projectCtx.projects.map((project) => (
                <SelectItem key={project.uuid} value={project.uuid}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex"
          >
            <a
              href="https://metal-stack.io/docs/home/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              Docs
            </a>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <IconHeartRateMonitor />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {data?.health?.services.map((service) => (
                <ServiceHealthItem
                  key={service.name}
                  serviceName={service.name}
                  status={service.status}
                  message={service.message}
                />
              ))}
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            aria-label="Submit"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <IconMoon /> : <IconSun />}
          </Button>
        </div>
      </div>
    </header>
  );
}
