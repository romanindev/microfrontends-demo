import type { RemotesConfig, RemoteName } from "../types/remotes";

let remotesConfig: RemotesConfig | null = null;

export function setRemotesConfig(config: RemotesConfig) {
  remotesConfig = config;
}

export function getRemoteUrl(remoteName: RemoteName): string {
  if (!remotesConfig) {
    throw new Error("Remotes config has not been initialized");
  }

  const url = remotesConfig[remoteName];

  if (!url) {
    throw new Error(`Remote URL not found for: ${remoteName}`);
  }

  return url;
}
