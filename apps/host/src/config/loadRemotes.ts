import type { RemotesConfig } from "../types/remotes";

export async function loadRemotesConfig(): Promise<RemotesConfig> {
  const response = await fetch("/remotes.json");

  if (!response.ok) {
    throw new Error(`Failed to load remotes config: ${response.status}`);
  }

  return (await response.json()) as RemotesConfig;
}
