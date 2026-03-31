import React from 'react'

export const safeLazy = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  remoteName: string,
) => {
  return React.lazy(() =>
    factory().catch((error) => {
      console.error(`Failed to load remote: ${remoteName}`, error);

      return {
        default: () => (
          <div style={{ padding: 16, border: "1px solid red" }}>
            Failed to load {remoteName}
          </div>
        ),
      };
    }),
  );
}

