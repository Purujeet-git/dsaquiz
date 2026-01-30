"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRedirect({ nextUrl, delay = 4000 }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(nextUrl);
    }, delay);

    return () => clearTimeout(timer);
  }, [nextUrl, delay, router]);

  return null;
}
