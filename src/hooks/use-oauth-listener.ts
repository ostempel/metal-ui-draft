import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

export function useOAuthListener() {
  useEffect(() => {
    const unlistenPromise = listen<string>("oauth-token", (event) => {
      const token = event.payload;
      console.log("✅ Token angekommen:", token);

      localStorage.setItem("token", token);

      // Optional: Router Redirect
      // navigate("/dashboard");
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);
}