"use client";

import { useEffect } from "react";

export default function EasterEgg() {
  useEffect(() => {
    console.log("Made with ❤️ by https://madebyarthouse.com – work with us!");
  }, []);
  return null;
}
