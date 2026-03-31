export type RemoteName = "catalog" | "cart";

export type RemoteModule<T = unknown> = {
  default: T;
};

export type FederationContainer = {
  init: (shareScope: unknown) => Promise<void> | void;
  get: (module: string) => Promise<() => unknown>;
};

declare global {
  interface Window {
    catalog?: FederationContainer;
    cart?: FederationContainer;
    __remotes_config__?: Record<RemoteName, string>;
    __federation_shared__?: unknown;
  }
}
