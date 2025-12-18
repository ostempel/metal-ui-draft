import AlertHint from "@/components/ui/alert/AlertHint";
import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";

type TenantContextValue = {
  currentTenant: Tenant;
  tenants: Tenant[];
  setCurrentTenant: (tenant: Tenant) => void;
};

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  const [currentTenant, setCurrentTenant] = useState<Tenant | undefined>(
    user.defaultTenant
  );

  useEffect(() => {
    if (!currentTenant && user.tenants.length > 0) {
      setCurrentTenant(user.tenants[0]);
    }
  }, [currentTenant, user.tenants]);

  if (!currentTenant) {
    return (
      <AlertHint
        title="No tenants available"
        description="Please create a tenant to continue."
      />
    );
  }

  return (
    <TenantContext.Provider
      value={{
        currentTenant: currentTenant,
        tenants: user.tenants,
        setCurrentTenant: setCurrentTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }

  return context;
}
