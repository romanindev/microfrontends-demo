import type { RemoteName } from "../types/remotes";

type RemotesConfig = Record<RemoteName, string>;

let remotesConfig: RemotesConfig | null = null;

export function setRemotesConfig(config: RemotesConfig) {
  remotesConfig = config;
  window.__remotes_config__ = config;
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
