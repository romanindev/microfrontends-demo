import { useEffect, useState } from "react";
import { buildInfo as hostBuildInfo } from "../buildInfo";
import type { BuildInfo } from "../types/buildInfo";

export function useBuildInfo() {
  const [items, setItems] = useState<BuildInfo[]>([hostBuildInfo]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const results = await Promise.allSettled([
        import("catalog/buildInfo"),
        import("cart/buildInfo"),
      ]);

      if (!mounted) {
        return;
      }

      const remoteItems: BuildInfo[] = results
        .flatMap((result) => {
          if (result.status !== "fulfilled") {
            return [];
          }

          const info =
            result.value.default?.buildInfo ??
            // fallback if module shape changes
            (result.value as any).buildInfo;
          return info ? [info] : [];
        });

      setItems([hostBuildInfo, ...remoteItems]);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return items;
}
