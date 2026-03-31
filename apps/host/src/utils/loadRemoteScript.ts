const loadedScripts = new Set<string>();

export function loadRemoteScript(url: string): Promise<void> {
  if (loadedScripts.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${url}"]`);

    if (existingScript) {
      loadedScripts.add(url);
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      loadedScripts.add(url);
      resolve();
    };

    script.onerror = () => {
      reject(new Error(`Failed to load remote script: ${url}`));
    };

    document.head.appendChild(script);
  });
}
