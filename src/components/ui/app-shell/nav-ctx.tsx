"use client";

import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useProject } from "@/providers/ProjectProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../label";
import { useTenant } from "@/providers/TenantProvider";

export function NavCtx() {
  const projectCtx = useProject();
  const tenantCtx = useTenant();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <Select
          value={tenantCtx.currentTenant.login}
          onValueChange={(value) =>
            tenantCtx.setCurrentTenant(
              tenantCtx.tenants.find((t) => t.login === value)!
            )
          }
        >
          <Label className="text-xs text-muted-foreground">Tenant</Label>
          <SelectTrigger id="rows-per-page" size="sm" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {tenantCtx.tenants.map((tenant) => (
              <SelectItem key={tenant.login} value={tenant.login}>
                {tenant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={projectCtx.currentProject.uuid}
          onValueChange={(value) =>
            projectCtx.setCurrentProject(
              projectCtx.projects.find((p) => p.uuid === value)!
            )
          }
        >
          <Label className="text-xs text-muted-foreground">Project</Label>
          <SelectTrigger id="rows-per-page" size="sm" className="w-full">
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
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
