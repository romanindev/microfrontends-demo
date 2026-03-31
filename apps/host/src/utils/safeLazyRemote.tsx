import React from "react";
import type { RemoteName } from "../types/federation";
import { loadFederatedModule } from "./loadFederatedModule";

type RemoteFallbackProps = {
  remoteName: RemoteName;
};

function RemoteLoadError({ remoteName }: RemoteFallbackProps) {
  return (
    <div style={{ padding: 16, border: "1px solid red", borderRadius: 8 }}>
      Failed to load remote: {remoteName}
    </div>
  );
}

export function safeLazyRemote<T extends React.ComponentType<any>>(
  remoteName: RemoteName,
  exposedModule: string,
) {
  return React.lazy(async () => {
    try {
      return await loadFederatedModule<T>(remoteName, exposedModule);
    } catch (error) {
      console.error(`Failed to load remote: ${remoteName}`, error);

      return {
        default: (() => <RemoteLoadError remoteName={remoteName} />) as T,
      };
    }
  });
}
