"use client";
import { useEffect } from "react";
/** Sets lang/dir on <html> for Arabic pages and restores them when the visitor navigates away. */
export default function RtlDoc() {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang, prevDir = html.dir;
    html.lang = "ar"; html.dir = "rtl";
    return () => { html.lang = prevLang || "en"; html.dir = prevDir || "ltr"; };
  }, []);
  return null;
}
