"use client";

import React, { useEffect } from "react";

type MouseOrTouchEvent = MouseEvent | TouchEvent;

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: (event: MouseOrTouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseOrTouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
