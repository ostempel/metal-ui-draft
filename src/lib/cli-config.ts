import { invoke } from "@tauri-apps/api/core";

export type CliContext = {
  name: string;
  apiToken: string;
  apiUrl: string;
  defaultProject: string;
  provider: string;
};

export type CliConfig = {
  contexts: CliContext[];
  currentContext?: string;
  previousContext?: string;
};

export async function loadCliConfig(): Promise<CliConfig> {
  return invoke("read_cli_config");
}
