"use client";

import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { PAGES } from "@/config/pages.config";

export const QRCode = ({ code }: { code: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    // server-e jeno kokhono run na kore
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    // 1) prothom bar e instance create
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: 160,
        height: 160,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
        },
      });

      // container e append kore dei
      qrRef.current.append(containerRef.current);
    }

    // 2) protibar code change hole data update
    const origin = window.location.origin;

    qrRef.current.update({
      data: `${origin}${PAGES.SIGNUP_REFERRAL(code)}`,
    });

    // optional: component unmount hole container clear kora
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [code]);

  return (
    <div className="grid h-40 w-40 grid-cols-8 gap-px">
      <div ref={containerRef} className="col-span-8 row-span-8" />
    </div>
  );
};
