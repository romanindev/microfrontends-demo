const loadedScripts = new Map<string, Promise<void>>();

export function loadRemoteScript(url: string): Promise<void> {
  const existing = loadedScripts.get(url);

  if (existing) {
    return existing;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[data-remote-entry="${url}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    script.dataset.remoteEntry = url;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load remote script: ${url}`));

    document.head.appendChild(script);
  });

  loadedScripts.set(url, promise);

  return promise;
}
