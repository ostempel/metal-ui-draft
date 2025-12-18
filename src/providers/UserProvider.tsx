import { createContext, useContext } from "react";
import { useQuery } from "@connectrpc/connect-query";
import {
  UserService,
  type User,
} from "@metal-stack/api/js/metalstack/api/v2/user_pb";
import LoadingScreen from "@/components/loading-screen/loading-screen";
import AlertHint from "@/components/alert/AlertHint";

type UserContextValue = {
  user: User;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useQuery(UserService.method.get);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data?.user) {
    return (
      <AlertHint
        title="Error loading user"
        description={error?.message ?? "User not available"}
      />
    );
  }

  return (
    <UserContext.Provider value={{ user: data.user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): User {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context.user;
}
