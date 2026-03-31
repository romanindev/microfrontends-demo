import { getRemoteUrl } from "../config/remotesRuntime";
import type { FederationContainer, RemoteModule, RemoteName } from "../types/federation";
import { loadRemoteScript } from "./loadRemoteScript";

function getContainer(remoteName: RemoteName): FederationContainer {
  const container = window[remoteName];

  if (!container) {
    throw new Error(`Remote container "${remoteName}" was not found on window`);
  }

  return container;
}

async function initContainer(container: FederationContainer) {
  const shareScope =
    window.__federation_shared__ ??
    // fallback for runtimes that expose this global
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__federation_shared__;

  await container.init(shareScope);
}

export async function loadFederatedModule<T>(
  remoteName: RemoteName,
  exposedModule: string
): Promise<RemoteModule<T>> {
  const remoteUrl = getRemoteUrl(remoteName);

  await loadRemoteScript(remoteUrl);

  const container = getContainer(remoteName);
  await initContainer(container);

  const moduleFactory = await container.get(exposedModule);
  const module = moduleFactory() as T;

  return {
    default: module,
  };
}
