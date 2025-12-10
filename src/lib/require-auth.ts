import { redirect } from "react-router";
import { loadCliConfig } from "./cli-config";

export async function requireAuthLoader() {
  const config = await loadCliConfig();

  const current = config.contexts.find(
    (ctx) => ctx.name === config.currentContext
  );

  if (!current?.apiToken) {
    throw redirect("/login");
  }

  return null;
}
