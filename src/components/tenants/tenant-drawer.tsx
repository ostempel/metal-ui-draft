"use client";

import { TenantService } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useQuery } from "@connectrpc/connect-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertHint from "@/components/ui/alert/AlertHint";

interface TenantDrawerProps {
  id: string;
}

export default function TenantDrawer({ id }: TenantDrawerProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useQuery(
    TenantService.method.get,
    {
      login: id,
    },
    { enabled: open }
  );

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Tenant detail</DrawerTitle>
          <DrawerDescription>
            Showing details for tenant{" "}
            <span className="text-primary">{id}</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isLoading && <Skeleton className="h-12" />}
          {error && (
            <AlertHint
              title="Error loading tenant"
              description={error.message}
            />
          )}
          {!error && data && data.tenant && (
            <div className="flex flex-col gap-2">
              <div>
                <strong>Login:</strong> {data.tenant.login}
              </div>
              <div>
                <strong>Description:</strong> {data.tenant.description}
              </div>
            </div>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
