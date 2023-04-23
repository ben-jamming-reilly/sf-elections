import { useState, useEffect } from "react";

export const useHasHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
