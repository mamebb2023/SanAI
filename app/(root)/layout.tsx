"use client";

import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // handle ?utm_source query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    if (utmSource) {
      console.log("Utm Source:", utmSource);
      localStorage.setItem("utm_source", utmSource);
    }
  }, []);

  return <>{children}</>;
};

export default Layout;
