"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceHandler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(debounceHandler);
  }, [value, delay]);

  return debouncedValue;
};