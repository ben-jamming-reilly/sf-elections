"use client";

import { useEffect } from "react";

export default function EasterEgg() {
  useEffect(() => {
    console.log(
      "Made with ❤️ by https://chrcit.com / https://madebyarthouse.com",
      "Forked by https://benjaminreilly.com",
    );
  }, []);
  return null;
}
