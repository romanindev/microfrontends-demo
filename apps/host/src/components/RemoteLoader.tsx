import { Suspense } from 'react';
import type { PropsWithChildren } from 'react';

type RemoteLoaderProps = PropsWithChildren;

export default function RemoteLoader({ children }: RemoteLoaderProps) {
  return (
    <Suspense fallback={<div>Loading remote module...</div>}>
      {children}
    </Suspense>
  );
}
