// https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5

import { useState, useEffect } from "react";

export const useHydrationSafeStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
