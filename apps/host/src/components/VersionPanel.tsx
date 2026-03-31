import type { BuildInfo } from "../types/buildInfo";

type VersionPanelProps = {
  items: BuildInfo[];
};

export function VersionPanel({ items }: VersionPanelProps) {
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        padding: 12,
        border: "1px solid #ccc",
        borderRadius: 8,
        background: "#fff",
        fontSize: 12,
        minWidth: 260,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <strong style={{ display: "block", marginBottom: 8 }}>
        Build info
      </strong>

      {items.map((item) => (
        <div key={item.name} style={{ marginBottom: 8 }}>
          <div><strong>{item.name}</strong></div>
          <div>version: {item.version}</div>
          <div>built: {item.buildTime}</div>
        </div>
      ))}
    </div>
  );
}
