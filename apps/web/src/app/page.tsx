"use client";

import { Splash } from "@/components/common/splash";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/books");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return <Splash />;
}
