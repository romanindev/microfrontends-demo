import React from "react";
import { loadRemoteScript } from "./loadRemoteScript";
import type { RemoteName } from "../types/remotes";

export function safeLazyWithRuntimeConfig<T extends React.ComponentType<any>>(
  remoteName: RemoteName,
  remoteUrlResolver: (remoteName: RemoteName) => string,
  factory: () => Promise<{ default: T }>,
) {
  return React.lazy(async () => {
    try {
      const remoteUrl = remoteUrlResolver(remoteName);
      await loadRemoteScript(remoteUrl);

      return await factory();
    } catch (error) {
      console.error(`Failed to load remote: ${remoteName}`, error);

      return {
        default: () => <div>Failed to load {remoteName}</div>,
      };
    }
  });
}
