"use client";

import { useEffect, useRef } from "react";

export const useMounted = () => {
  const isMounted = useRef<boolean>(false); // Initialize as false

  useEffect(() => {
    isMounted.current = true; // Set to true on mount

    return () => {
      isMounted.current = false; // Set to false on unmount
    };
  }, []);

  // Return a function to check if the component is mounted
  return () => isMounted.current;
};
