import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { loadRemotesConfig } from "./config/loadRemotes";
import { setRemotesConfig } from "./config/remotesRuntime";

async function bootstrap() {
  const root = ReactDOM.createRoot(document.getElementById("root")!);

  try {
    const config = await loadRemotesConfig();
    setRemotesConfig(config);

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Failed to bootstrap host", error);

    root.render(<div style={{ padding: 16 }}>Failed to start application</div>);
  }
}

bootstrap();
