"use client";
import { useEffect } from "react";

const easterEggs = [
  "„We have nothing to loose except our blockchains“",
  "„No gods, no master branch“",
];

export default function EasterEgg() {
  useEffect(() => {
    console.log("Made with ❤️ by https://arthouse.agency – work with us!");
  }, []);
  return null;
}
