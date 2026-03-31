import { Suspense } from 'react';
import type { PropsWithChildren } from 'react';

type RemoteLoaderProps = PropsWithChildren & {
  fallback?: string;
};

export default function RemoteLoader({ children,  fallback}: RemoteLoaderProps) {
  return (
    <Suspense fallback={<div>{fallback ?? 'Loading remote module...'}</div>}>
      {children}
    </Suspense>
  );
}
