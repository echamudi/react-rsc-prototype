'use client';

import { useState } from 'react';

export function Counter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
