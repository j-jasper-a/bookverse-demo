"use client";

import { cn } from "@/lib/utils/cn";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  const router = useRouter();

  function handleClick() {
    router.push("/books");
  }

  return (
    <IconButton
      onClick={handleClick}
      className={cn("flex size-12 rounded-none px-0 py-2", className)}
    >
      <Image
        src={"/assets/common/logo.svg"}
        alt=""
        width={512}
        height={512}
        className="h-full w-full shrink"
      />
    </IconButton>
  );
}
